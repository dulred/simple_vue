<template>
    <div class="role">
        <div class="search">
            <el-button type="primary" size="small" @click="(editRef as any).drawer=true">添加</el-button>
        </div>
        <el-table :data="showRoles" style="width: 100%">
            <el-table-column prop="roleId" label="编号" width="100" />
            <el-table-column prop="roleName" label="名称" width="100" />
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
        <EditRole ref="editRef" @sync-list="loadRoles"></EditRole>
        <el-pagination small  style="margin-top: 10px;" background layout="prev, pager, next"
         :total="roles.length" :page-size="1"  v-model:current-page="pageIndex"></el-pagination>
            </div>
</template>

<script setup lang="ts">
    import EditRole from "../../components/user/EditRole.vue"
    import { onMounted, ref, computed} from 'vue';
    import {$list,$delete,$getOne} from '../../api/role.ts'
    import { ElMessage, ElMessageBox ,ElNotification} from 'element-plus'

    interface Role {
        roleId: string
        roleName: string
    }

    interface EditRef {
        drawer: boolean
        formData:object
    }
    // 角色列表
    let roles = ref<Role[]>([]);

    // 页码
    let pageIndex = ref(1)

    // 显示的列表
    let showRoles = computed(()=>{
        return roles.value.slice((pageIndex.value - 1)*1,pageIndex.value*1)
    })

    // 加载角色列表
    const loadRoles = async ()=>{
        roles.value = $list()
    }

    onMounted(()=>{
        loadRoles()
    })

    const handleEdit = async (roleId:number) => {
        let ret = await $getOne({roleId})
        editRef.value!.drawer= true
        editRef.value!.formData = ret
    }

    const handleDelete = (roleId:number) => {
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
            let ret = $delete({roleId})
            if (ret.success) {
                    ElNotification({
                        title: '提示',
                        message: ret.message,
                        type: 'success',
                    })
                    loadRoles()
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