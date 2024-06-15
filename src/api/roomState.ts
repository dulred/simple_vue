import {$get,$post} from '../utils/request.ts'

//返回房型列表
export const $list = ()=>{
    // let ret = await $get('RoomState/List')
   let ret = [
    {roomStateId:1, roomStateName:'空闲'},
    {roomStateId:2, roomStateName:'入住'},
    {roomStateId:3, roomStateName:'维修'},
   ]    
    
   
    return  ret
}


//返回房型列表
export const $list2 = ()=>{
    // let ret = await $get('RoomState/List')
   let ret = [
    {roomStateId:1, roomStateName:'空闲'},
    {roomStateId:3, roomStateName:'维修'},
   ]    
    
   
    return  ret
}
