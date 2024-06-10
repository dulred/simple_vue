import {$get,$post} from '../utils/request.ts'

//返回角色列表
export const $list =  ()=>{
    // let ret = await $get('Role/List')
   let ret = [
        {
            roleId:'1',
            roleName: '系统管理员'
        },
        {
            roleId:'2',
            roleName: '普通管理员'
        },
        {
            roleId:'3',
            roleName: 'xx管理员'
        },
        {
            roleId:'4',
            roleName: 'xx2管理员'
        }
    ]
    return  ret
}

export const $add = async (params:object)=>{
    // let ret = await $post('Role/Add',params)
    let ret = {
        success:true,
        message:"添加成功"
    }
    return ret
}


export const $delete = (params:object)=>{
    // let ret =await $post('Role/Delete',params)
    let ret = {
        success:true,
        message:"删除成功"
    }
    return ret;
}

//获取单个角色
export const $getOne =  (params:object)=>{
    // let ret = await $get('Role/GetOne', params)
    let ret = {
        roleId:114,
        roleName:"23123"
    }
    return ret
}

// 修改角色
export const $update = async (params:object)=>{
    // let ret = await $post('Role/Update',params)
    let ret = {
        success:true,
        message:"更新成功"
    }
    return ret
}