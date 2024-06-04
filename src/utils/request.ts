import axios from 'axios'
import { baseURL_dev } from '../config/baseURL.ts'


// 初始化一个axios对象
const instance = axios.create({
    baseURL: baseURL_dev,
    timeout: 3000,
  });

// 请求拦截器
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['token'] = sessionStorage.getItem('token')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应拦截器
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

//   get请求方法
export const $get = async (url:string, params:object={})=>{
    let {data} = await instance.get(url,{params})
    return data
}


//   post请求方法
export const $post = async (url:string, params:object={})=>{
    let {data} = await instance.get(url,params)
    return data
}