import {$get,$post} from '../utils/request.ts'

//返回客户列表
export const $list = ()=>{
    // let ret = await $get('GuestRecord/List')
   let ret =
   {
    count:3,
    data:[
        {
            deposit:10000,
            guestId:1,
            guestName:"张三",
            identityId:"12345",
            leaveDate:null,
            phone:"123",
            resideDate:"2023/11/30 0:00:00",
            resideState:{
                resideStateId:1,
                resideStateName:"未结账"
            },
            resideStateId:1,
            room:{
                description:"<p>已经改完</p>",
                roomId:"1005",
                roomState:{
                    roomStateId:2,
                    roomStateName:"入住"
                },
                roomStateId:2,
                roomType:{
                    beadNum:2,
                    roomTypeId:1,
                    roomTypeName:"标准间",
                    roomTypePrice:200,
                    typeDescription:"无"
                }
            }
           } 
           ,
           {
            deposit:10000,
            guestId:1,
            guestName:"张三",
            identityId:"12345",
            leaveDate:null,
            phone:"123",
            resideDate:"2023/11/30 0:00:00",
            resideState:{
                resideStateId:1,
                resideStateName:"未结账"
            },
            resideStateId:1,
            room:{
                description:"<p>已经改完</p>",
                roomId:"1005",
                roomState:{
                    roomStateId:2,
                    roomStateName:"入住"
                },
                roomStateId:2,
                roomType:{
                    beadNum:2,
                    roomTypeId:1,
                    roomTypeName:"标准间",
                    roomTypePrice:200,
                    typeDescription:"无"
                }
            }
           } ,{
            deposit:10000,
            guestId:1,
            guestName:"张三",
            identityId:"12345",
            leaveDate:null,
            phone:"123",
            resideDate:"2023/11/30 0:00:00",
            resideState:{
                resideStateId:1,
                resideStateName:"未结账"
            },
            resideStateId:1,
            room:{
                description:"<p>已经改完</p>",
                roomId:"1005",
                roomState:{
                    roomStateId:2,
                    roomStateName:"入住"
                },
                roomStateId:2,
                roomType:{
                    beadNum:2,
                    roomTypeId:1,
                    roomTypeName:"标准间",
                    roomTypePrice:200,
                    typeDescription:"无"
                }
            }
           } 
    
        ]
   } 
    return  ret
}

// 添加客户
export const $add = async (params:object)=>{
    // let ret = await $post('GuestRecord/Add',params)
    let ret = {
        success:true,
        message:"添加成功"
    }
    return ret
}

// 删除客户
export const $delete = (params:object)=>{
    // let ret =await $post('GuestRecord/Delete',params)
    let ret = {
        success:true,
        message:"删除成功"
    }
    return ret;
}

//获取单个角色
export const $getOne =  (params:object)=>{
    // let ret = await $get('GuestRecord/GetOne', params)
    let ret = {
    }
    return ret
}

// 修改角色
export const $update = async (params:object)=>{
    // let ret = await $post('GuestRecord/Update',params)
    let ret = {
        success:true,
        message:"更新成功"
    }
    return ret
}