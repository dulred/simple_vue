<template>
    <div class="room">
        <div class="search">
            <span>房型: </span>
            <el-select
                v-model="roomTypeId"
                placeholder="Select"
                style="width: 240px"
                >
                <el-option
                    v-for="item in typeList"
                    :key="item.roomTypeId"
                    :label="item.roomTypeName"
                    :value="item.roomTypeId"
                />
                </el-select>
                <span>状态:</span>
                <el-select
                v-model="roomTypeId"
                placeholder="Select"
                style="width: 240px"
                >
                <el-option
                    v-for="item in stateList"
                    :key="item.roomStateId"
                    :label="item.roomStateName"
                    :value="item.roomStateId"
                />
                </el-select>
            <el-button style="margin-left: 10px;" type="success" size="small" @click="loadList">查询</el-button>
            <el-button type="primary" size="small" @click="(editRef as any).drawer=true">添加</el-button>
        </div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="roomId" label="房间号" width="100" />
            <el-table-column prop="roomType.roomTypeName" label="房型" width="150" />
            <el-table-column prop="roomType.roomTypePrice" label="价格" width="100" />
            <el-table-column prop="roomType.bedNum" label="床位" width="100"> </el-table-column>
            <el-table-column prop="roomState.roomStateName" label="状态" width="100" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row.roomId)">
                    编辑
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row.roomId)"
                    v-if="scope.row.roomState.roomStateId!=2"
                    >
                    删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination small style="margin-top: 10px;" background layout="prev, pager, next"
         :total="total" :page-size="10"  v-model:current-page="pageIndex" @current-change="loadList"></el-pagination>
        <EditUser ref="editRef" @sync-list="loadList"></EditUser>
    </div>
</template>

<script setup lang="ts">
    import EditUser from "../../components/room/EditRoom.vue"
    import { onMounted, ref} from 'vue'
    import {$list,$getOne,$delete} from '../../api/room.ts'
    import {$list as $typeList} from '../../api/roomType.ts'
    import {$list as $stateList} from '../../api/roomState.ts'
    import { ElMessage, ElMessageBox ,ElNotification} from 'element-plus'
    import {xlsx} from '../../utils/xlsx.ts'

    interface EditRef {
        drawer: boolean
        formData:object
    }
    // 页码
    let pageIndex = ref(1)

    let editRef = ref<EditRef | null>(null)

    // 用户列表
    let list = ref([])
    // 总数量
    let total = ref(0)
    // 加载用户列表
    const loadList = async()=>{
        let {data,count} = await $list({
            roomStateId:roomStateId.value,
            roomTypeId:roomTypeId.value,
            pageIndex:pageIndex.value,
            pageSize:10
        })
        list.value = data
        total.value = count
    }

    // 房型列表
    let typeList = ref([])

    // 房型编号
    let roomTypeId = ref(0)

    // 加载房型列表
    const loadTypeList = async ()=>{
        typeList.value = await $typeList()
        typeList.value.unshift({
            roomTypeId:0,
            roomTypeName: '请选择房型'
        })
    }
    
    // 房间状态列表
    let stateList = ref([])

    // 房间状态编号
    const roomStateId = ref(0) 

    //加载房间状态列表
    const loadStateList = async()=>{
        stateList.value = await $stateList()
        stateList.value.unshift({
            roomStateId:0,
            roomStateName: '请选择状态'
        })
    }

    // 导出Excel
    const exportExcel = ()=>{
        //数据
        let data = list.value.map(r=>{
            return {
                roomId:r.roomId,
                roomTypeName:r.roomType.roomTypeName,
                roomTypePrice:r.roomType.roomTypePrice,
                bedNum:r.roomType.beadNum,
                roomStateName:r.roomState.roomStateName
            }
        })
        
        // 表头
        let head = {
            roomId:"房间号",
            roomTypeName:"房间类型",
            roomTypePrice:"房间价格",
            bedNum:"床位数量",
            roomStateName:"房间状态"
        }

        xlsx(data,head,"房间信息")

    }




    
    onMounted(()=>{
        loadList()
        loadTypeList()
        loadStateList()
    })


    const handleEdit = async (roomId:string) => {
        let ret = await $getOne({roomId})
        ret.id = ret.roomId
        editRef.value!.drawer= true
        editRef.value!.formData = ret
    }

    const handleDelete = (id:number) => {
        ElMessageBox.confirm(
            '确当删除吗?',
            'Warning',
            {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            }
        )
            .then(() => {
            let ret = $delete({id})
            if (ret.success) {
                    ElNotification({
                        title: '提示',
                        message: ret.message,
                        type: 'success',
                    })
                    loadList()
                } else {
                ElNotification({
                        title: '提示',
                        message: ret.message,
                        type: 'error',
                    })
                }})
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消退出',
                })
            })
    }


</script>

<style scoped lang="scss">
.search {margin-top: 5px;}
</style>