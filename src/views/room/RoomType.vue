<template>
    <div class="roomtype">
        <div class="search">
            <el-button type="primary" size="small" @click="(editRef as any).drawer=true">添加</el-button>
        </div>
        <el-table :data="showList" style="width: 100%">
            <el-table-column prop="roomTypeId" label="房型编号" width="100" />
            <el-table-column prop="roomTypeName" label="房型种类" width="100" />
            <el-table-column prop="bednum" label="床位数量" width="100" />
            <el-table-column prop="roomTypePrice" label="房型价格" width="100" />
            <el-table-column prop="typeDescription" label="房型描述" width="100" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row.roleId)">
                    编辑
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row.roleId)"
                    >
                    删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <EditRoomType ref="editRef" @sync-list="loadList"></EditRoomType>
        <el-pagination small  style="margin-top: 10px;" background layout="prev, pager, next"
         :total="list.length" :page-size="1"  v-model:current-page="pageIndex"></el-pagination>
            </div>
</template>

<script setup lang="ts">
    import EditRoomType from "../../components/room/EditRoomType.vue"
    import { onMounted, ref, computed} from 'vue';
    import {$list,$delete,$getOne} from '../../api/roomType.ts'
    import { ElMessage, ElMessageBox ,ElNotification} from 'element-plus'

    interface List {
        bednum:number,
        roomTypeId:number,
        roomTypeName: string,
        roomTypePrice:number,
        typeDescription:string
    }

    interface EditRef {
        drawer: boolean 
        formData:object
    }
    // 角色列表
    let list = ref<List[]>([]);

    // 页码
    let pageIndex = ref(1)

    // 显示的列表
    let showList = computed(()=>{
        return list.value.slice((pageIndex.value - 1)*1,pageIndex.value*1)
    })

    // 加载角色列表
    const loadList = async ()=>{
        list.value = $list()
    }

    onMounted(()=>{
        loadList()
    })

    const handleEdit = async (roomTypeId:number) => {
        let ret = await $getOne({roomTypeId})
        editRef.value!.drawer= true
        editRef.value!.formData = ret
    }

    const handleDelete = (roomTypeId:number) => {
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
            let ret = $delete({roomTypeId})
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

    let editRef = ref<EditRef | null>(null)


</script>

<style scoped lang="scss">
    .search {margin-top: 5px;}
</style>