import {$get} from '../utils/request.ts'
import { md5 } from 'md5js'
import { ElNotification } from 'element-plus'

interface LoginParams {
    loginId: string;
    loginPwd: string;
}

//登录方法
export const $Login = async (params:LoginParams)=>{
    // 对密码进行加密
    params.loginPwd = md5(md5(params.loginPwd,32).split('').reverse().join(''),32)
    let ret = await $get('Admin/Login',params)
    if(ret.success){
        ElNotification({
            title: '通知',
            message: ret.message,
            type: 'success'
        })
        sessionStorage.setItem('token',ret.token)
        return true
    }else {
        ElNotification({
            title: '通知',
            message: ret.message,
            type: 'error'
        })
        return false
    }
}