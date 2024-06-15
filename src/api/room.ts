import {$get,$post} from '../utils/request.ts'

//返回房型列表
export const $list = (params:object)=>{
    // let ret = await $get('Room/List')
   let ret = {
    count:4,
    data:[
        {
            roomState:{roomStateId:1, roomStateName:'空闲'},
            roomId: '1001',
            roomStateId:1,
            roomType:{
                bedNum:3,
                roomTypeId:1,
                roomTypeName:'标准间',
                roomTypePrice:200,
                typeDescription:'无'
            },
            roomTypeId:1
        },
        {
            roomId: '1002',
            roomState:{roomStateId:2, roomStateName:'入住'},
            roomStateId:1,
            roomType:{
                bedNum:3,
                roomTypeId:1,
                roomTypeName:'标准间',
                roomTypePrice:200,
                typeDescription:'无'
            },
            roomTypeId:1
        },
        {
            roomId: '1003',
            roomState:{roomStateId:1, roomStateName:'空闲'},
            roomStateId:1,
            roomType:{
                bedNum:3,
                roomTypeId:1,
                roomTypeName:'标准间',
                roomTypePrice:200,
                typeDescription:'无'
            },
            roomTypeId:1
        },
        {
            roomId: '1004',
            roomState:{roomStateId:1, roomStateName:'空闲'},
            roomStateId:1,
            roomType:{
                bedNum:3,
                roomTypeId:1,
                roomTypeName:'标准间',
                roomTypePrice:200,
                typeDescription:'无'
            },
            roomTypeId:1
        },
    ],
    pageIndex:1,
    pageSize:10
   } 
    return  ret
}

export const $add = async (params:object)=>{
    // let ret = await $post('Room/Add',params)
    let ret = {
        success:true,
        message:"添加成功"
    }
    return ret
}


export const $delete = (params:object)=>{
    // let ret =await $post('Room/Delete',params)
    let ret = {
        success:true,
        message:"删除成功"
    }
    return ret;
}

//获取单个角色
export const $getOne =  (params:object)=>{
    // let ret = await $get('Room/GetOne', params)
    let ret = {
        id:4,
        roomId: '1002',
        roomState:{roomStateId:1, roomStateName:'空闲'},
        roomStateId:1,
        roomType:{
            bedNum:3,
            roomTypeId:1,
            roomTypeName:'标准间',
            roomTypePrice:200,
            typeDescription:'无'
        },
        roomTypeId:1
    }
    return ret
}

// 修改角色
export const $update = async (params:object)=>{
    // let ret = await $post('Room/Update',params)
    let ret = {
        success:true,
        message:"更新成功"
    }
    return ret
}