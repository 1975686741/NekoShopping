
## 技术栈

vue3、pinia、vue-router、axios、async/await、vant


### axios 封装 

考虑到项目开发、上线使用的是不同的接口域名，所以对axios封装是很有必要的
在src目录新建api文件夹 在此文件夹下新建request.js  

```js
// request.js 封装

import axios from "axios";
import qs from "qs";

var  host;
// process.env是Nodejs提供的一个API，它返回一个包含用户环境信息的对象。
// 通过NODE_ENV 判断当前环境是生产环境(production)还是开发环境(development) 自动切换不同域名
// 暂时开发环境和生产环境  所以域名暂时一样 
if(process.env.NODE_ENV == "development"){ 
    host = "";
}else{
    host = "";
}

// 创建axios实例 
const instance = axios.create({
    // baseURL  公共接口路径
    baseURL: host,
    // timeout 超时时间
    timeout: 5000
});
// 请求拦截器
instance.interceptors.request.use(
    config => {
        if (config.method.toLowerCase() == 'post') {
            // qs系列化
            // https://www.npmjs.com/package/qs
            //  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
            //  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
            config.data = qs.stringify(config.data, { arrayFormat: 'repeat', allowDots: true })
        } else{
            // 
            config.params = config.data
        }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
)

// 响应拦截器  

instance.interceptors.response.use(

    response => {
      const res = response.data
      return res
    },
    error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
    }
)


export default  instance


```



```js
// 单个页面的封装 接口独立  一旦出现接口变动 可以直接去js文件当中查找而无需翻遍整个vue文件 对项目维护很有帮助
// 格式参考页面格式 如 页面组件路径为 views/home/index.vue  就在api文件夹新建home文件夹  api/home/index.js
import request from "@/api/request"

// 请求首页数据
function  home(data){
    return request({
        method:"get",
        url:"/topic/listaction",
        data
    })
}
// 意见反馈
function submitAction(data){
    return request({
        url:"/feedback/submitAction",
        method:"post",
        data
    })
}
export {
    home,
    submitAction
}
```

```js
// 引入封装好的请求
import { home,submitAction } from "@/api/home"
home({
    // 传递参数
	page:1
})
.then(res =>{
	console.log(res)
})

var obj = {
    content:"喵喵",
    name:"cat",
    openId:1231,
    phone:12312341234
}
submitAction(obj)
    .then(res =>{
    console.log(res)
})
```

### vant
vant的设计图是375px ;而项目的设计图是750px;这个时候vant的组件在项目当中存在缩放行为
安装插件 postcss-pxtorem 及 lib-flexible 
再项目中新建 postcss.config.js  

```js
module.exports = ({ file }) => {
    let isVant = file && file.dirname && file.dirname.indexOf("vant") > -1;
    let rootValue = isVant ? 37.5 : 75; // 判断条件 
    return {
        plugins: {
            autoprefixer: {},
            "postcss-pxtorem": {
                rootValue: rootValue,
                propList: ["*"] 
            }
        }
    }
}
```

