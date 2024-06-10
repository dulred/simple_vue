import {$get,$post} from '../utils/request.ts'

//返回房型列表
export const $list = ()=>{
    // let ret = await $get('RoomType/List')
   let ret = [
        {
            bednum:2,
            roomTypeId:1,
            roomTypeName: '标准间',
            roomTypePrice:200,
            typeDescription:"五"
        },
        {
            bednum:2,
            roomTypeId:1,
            roomTypeName: '大床房',
            roomTypePrice:200,
            typeDescription:"五"
        },
        {
            bednum:2,
            roomTypeId:1,
            roomTypeName: '三人间',
            roomTypePrice:200,
            typeDescription:"五"
        },
        {
            bednum:2,
            roomTypeId:1,
            roomTypeName: '标准套房',
            roomTypePrice:200,
            typeDescription:"五"
        }
    ]
    return  ret
}

export const $add = async (params:object)=>{
    // let ret = await $post('RoomType/Add',params)
    let ret = {
        success:true,
        message:"添加成功"
    }
    return ret
}


export const $delete = (params:object)=>{
    // let ret =await $post('RoomType/Delete',params)
    let ret = {
        success:true,
        message:"删除成功"
    }
    return ret;
}

//获取单个角色
export const $getOne =  (params:object)=>{
    // let ret = await $get('RoomType/GetOne', params)
    let ret = {
        bednum:2,
        roomTypeId:1,
        roomTypeName: '三人间',
        roomTypePrice:200,
        typeDescription:"五"
    }
    return ret
}

// 修改角色
export const $update = async (params:object)=>{
    // let ret = await $post('RoomType/Update',params)
    let ret = {
        success:true,
        message:"更新成功"
    }
    return ret
}