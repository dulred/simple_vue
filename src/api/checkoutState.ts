import {$get,$post} from '../utils/request.ts'

//获取结账状态列表
export const $list = ()=>{
    // let ret = await $get('checkoutState/List')
   let ret = [
    {roomStateId:1, roomStateName:'空闲'},
    {roomStateId:2, roomStateName:'入住'},
    {roomStateId:3, roomStateName:'维修'},
   ]    
    
   
    return  ret
}
