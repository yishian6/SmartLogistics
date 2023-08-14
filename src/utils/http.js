// 进行路由的二次封装
import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: '/api',
    timeout: 5000
})

//添加请求拦截器
http.interceptors.request.use(function (config) {
    //在发送请求之前
    return config;
}, function (error) {
    //请求错误时
    return Promise.reject(error);
})

//添加响应拦截器
//拦截器可以对请求做一些公共的处理，比如异常、返回数据的格式
http.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    // do something
                    break;
                case 402:
                    // do something
                    break;
            }
        }
        return Promise.reject(error.response.data);   // 返回接口返回的错误信息
    })

//export default 是默认导出,export 是按需导出,ES6语法 导出Default不需要花括号
export default http