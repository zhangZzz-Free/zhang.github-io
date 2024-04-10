# 接口防止重复调用方案

## 重复调用同个接口导致的问题

- 表单提交，输入框失焦、按钮点击、值变更提交等容易遇到重复请求的问题，即一次请求还没有执行完毕，用户又点击了一次，这样重复请求可能会造成后台数据异常。又比如在查询数据的时候点击了一次查询，还在处理数据的时候，用户又点击了一次查询。第一次查询执行完毕页面已经有数据展示出来了，用户可能正在看呢，此时第二次查询也处理完返回到前台把页面刷新了，就会造成很不好的体验

## 解决方案

1. `利用防抖避免重复调用接口`
2. `采用禁用按钮的方式，loading、置灰等`
3. `利用axios的cancelToken、AbortController方法取消重复请求`
4. `利用promise的三个状态改造方法3`

### 方法 1： 利用防抖

> 效果:当用户连续点击多次同一个按钮,最后一次点击之后,过小段时间后才发起一次请求
> 原理:每次调用方法后都产生一个定时器,定时器结束以后再发请求,如果重复调用方法,就取消当前的定时器,创建新的定时器,等结束后再发请求,可以用第三方封装的工具函数例如 lodash 的 debounce 方法来简化防抖的代码

```javascript
<div id="app">
    <button @click="onClick">请求</button>
</div>

methods: {
    // 调用lodash的防抖方法debounce,实现连续点击按钮多次,0.3秒后调用1次接口
    onClick: _.debounce(async function(){
        let res = await sendPost({username:'zs', age: 20})
        console.log('请求的结果', res.data)
    }, 300),
},
// 自定义指令防抖，在directive文件中自定义v-debounce指令
<el-button v-debounce:500="buttonDebounce">按钮</el-button>
```

#### 优缺点

> 1. 防抖可以有效减少请求的频率，防止接口重复调用，但是如果接口响应比较慢，
> 2. 响应时间超过防抖的时间阈值，再次点击也会出现重复请求 需要在触发事件加上防抖处理，不够通用

### 方法 2：采用禁用按钮的方式

> 禁用按钮：在发送请求之前，禁用按钮（利用 loading 或者 disabled 属性），直到请求完成后再启用它。这可以防止用户在请求进行中多次点击按钮

```javascript
<div id="app">
    <button @click="sendRequest" :loading="loading">请求</button>
 </div>

 methods: {
     async sendRequest() {
         this.loading = true; // 禁用按钮
         try {        // 发送请求
             await yourApiRequestFunction();        // 请求成功后，启用按钮
         } catch (error) {        // 处理错误情况      }
         finally {
             this.loading = false; // 请求完成后，启用按钮
         }
     },
 }
```

#### 优缺点

> 1.  最有效避免请求还在 pending 状态时，再次触发事件发起请求
> 2.  不够通用，需要在按钮、tab、输入框等触发事件的地方都加上

### 方法 3：利用 axios 取消接口的 api

> axios 内部提供的 CancelToken 来取消请求（AxiosV0.22.0 版本中把 CancelToken 打上 👎deprecated 的标记，意味废弃。与此同时，推荐 AbortController 来取而代之）
> 通过 axios 请求拦截器,在每次请求前把请求信息和请求的取消方法放到一个 map 对象当中,并且判断 map 对象当中是否已经存在该请求信息的请求,如果存在取消上次请求

```javascript
const pendingRequest = new Map();

function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&');
}

function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}

// axios拦截器代码
axios.interceptors.request.use(
  function (config) {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config); // 从pendingRequest对象中移除请求
    return response;
  },
  (error) => {
    removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
    if (axios.isCancel(error)) {
      console.log('已取消的重复请求：' + error.message);
    } else {
      // 添加异常处理
    }
    return Promise.reject(error);
  }
);
```

<p style="text-align: center">
  <img src="/images/request/request-1.jpg" alt="repeatRequest">
</p>

#### 优缺点

> 1.  可以防止前端重复响应相同数据导致体验不好的问题
> 2.  但是这个取消请求只是前端取消了响应，取消时请求已经发出去了，后端还是会一一收到所有的请求，该查库的查库，该创建的创建，针对这种情形，服务端的对应接口需要进行幂等控制

### 方法 4：利用 promise 的 pending、resolve、reject 状态

> 此方法其实是对 cancelToken 方案的改造，cancelToken 是在请求还在 pending 状态时，判断接口是否重复，重复则取消请求，但是无法保证服务端是否接收到了请求，我们只要改造这点，在发送请求前判断是否有重复调用，如果用重复调用接口，利用 promise 的 reject 拦截请求，在请求 resolve 或 reject 状态后清除用来判断是否是重复请求的 key

```javascript
// axios全局拦截文件
import axios from '@/router/interceptors
import Qs from 'qs'

const cancelMap = new Map()

// 生成key用来判断是否是同个请求
function generateReqKey(config = {}) {
    const { method = 'get', url, params, data } = config
    const _params = typeof params === 'string' ? Qs.stringify(JSON.parse(params)) : Qs.stringify(params)
    const _data = typeof data === 'string' ? Qs.stringify(JSON.parse(data)) : Qs.stringify(data)
    const str = [method, url, _params, _data].join('&')
    return str
}

function checkoutRequest(config) {
    const requestKey = generateReqKey(config)
    // 如果设置允许多次重复请求，直接返回成功，让网络请求继续流通下去
    if (!cancelMap.has(requestKey) || config._allowRepeatRequest) {
        cancelMap.set(requestKey, 0)
        return new Promise((resolve, reject) => {
            axios(config).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    } else {
      // 如果存在重复请求
        return new Promise((resolve, reject) => {
            reject(new Error())
        })
    }
}

// 移除已响应的请求，移除的时间可设置响应后延迟移除，此时间内可以继续阻止重复请求
export async function removeRequest(config = {}) {
    const time = config._debounceTime || 0
    const requestKey = generateReqKey(config)
    if (cancelMap.has(requestKey)) {
        // 延迟清空，防止快速响应时多次重复调用
        setTimeout(() => {
            cancelMap.delete(requestKey)
        }, time)
    }
}

export default checkoutRequest


// @/router/interceptors 拦截器代码
axios.interceptors.request.use(
    function (config) {
        return config;
    },
    (error) => {
        removeRequest(error.config) // 从cancelMap中移除key
        return Promise.reject(error)
    }
);
axios.interceptors.response.use(
    (response) => {
        removeRequest(response.config) // 从cancelMap中移除key
        return response;
    },
    (error) => {
        removeRequest(error.config || {}) // 从cancelMap中移除key
        return Promise.reject(error);
    }
);

// 接口可以配置_allowRepeatRequest开启允许重复请求
return request({
    url: 'xxxxxxx',
    method: 'post',
    data: data,
    loading: false,
    _allowRepeatRequest: true
 })

```

#### 优缺点：

> 此方法效果跟禁用按钮的效果一致，但是可以全局修改，方案比较通用

### ps

> 针对可能上传文件使用 formData 的情况，需要在重复请求那再判断一下
