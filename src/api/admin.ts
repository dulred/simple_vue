import {$get,$post} from '../utils/request.ts'
import { md5 } from 'md5js'
import { ElNotification } from 'element-plus'


interface LoginParams {
    loginId: string;
    loginPwd: string;
}

//登录方法
export const $Login = (params:LoginParams)=>{
    // 对密码进行加密
    params.loginPwd = md5(md5(params.loginPwd,32).split('').reverse().join(''),32)
    // let ret = await $get('Admin/Login',params)
    let ret = {
        success: "true",
        message: "登录成功",
        token: "123456"
    }
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

// 获取一个账户
export const $getOne = (params:object) =>{
    // let ret = await $get('Admin/GetOne',params)
    let ret = {
        id: 1,
        loginId:"admin",
        loginPwd:"123456",
        name: "兵哥",
        phone:"10086",
        photo:"",
        role:{roleId:1,roleName:'系统管理员'},
        roleId:1        
    }
    return ret
}

// 获取用户列表
export const $list = async (params:object)=>{
    // let ret = await $get('Admin/List',params)
    let ret = {
        count:1,
        data:[
            {
                id:1,
                loginId:'admin',
                loginPwd:'fsafsa',
                name:'管理员',
                phone:'10086',
                photo:'',
                role:{
                    roleId:1,
                    roleName:'系统管理员'
                },
                roleId:1
            }
        ],
        pageIndex:1,
        pageSize:10
    }
    return ret
}


// 添加用户
export const $add  = (params:object)=>{
    //对密码进行加密
    // params.loginPwd = md5(md5(params.loginPwd,32).split('').reverse().join(''),32)
    // let ret = await $post('Admin/Add',params)
    let ret = {
        success:true,
        message:"添加成功"
    }
    return ret;
}



// 添加用户
export const $update  = (params:object)=>{
    //对密码进行加密
    // params.loginPwd = md5(md5(params.loginPwd,32).split('').reverse().join(''),32)
    // let ret = await $post('Admin/Update',params)
    let ret = {
        success:true,
        message:"更新成功"
    }
    return ret;
}

// 删除用户
export const $delete = (params:object)=>{
    // let ret =await $post('Admin/Delete',params)
    let ret = {
        success:true,
        message:"删除成功"
    }
    return ret;
}

// 修改密码
export const $resetPwd  = async(params:object)=>{
    // 对密码进行加密
    // params.oldLoginPwd = md5(md5(params.oldloginPwd,32).split('').reverse().join(''),32)
    // params.newLoginPwd = md5(md5(params.newloginPwd,32).split('').reverse().join(''),32)
    // let ret = await $post('Admin/ResetPwd',params)
    let ret = {
        success:true,
        message:"删除成功"
    }
    return ret
}