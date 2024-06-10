<template>
    <div class="user">
        <div class="search">
            <span>角色: </span>
            <el-select
                v-model="roleId"
                placeholder="Select"
                style="width: 240px"
                >
                <el-option
                    v-for="item in roleList"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                />
                </el-select>
            <el-button style="margin-left: 10px;" type="success" size="small" @click="loadList">查询</el-button>
            <el-button type="primary" size="small" @click="(editRef as any).drawer=true">添加</el-button>
        </div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="编号" width="100" />
            <el-table-column prop="loginId" label="账号" width="150" />
            <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="photo" label="头像" width="100">
                <template #default="scope">
                    <el-image v-if="scope.row.photo" style="width: 100px; height: 100px" :src="baseURL_dev + 'upload/admin/'+scope.row.photo" fit="cover" />
                    <el-image v-else style="width: 100px; height: 100px" :src="defaultImage" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="100" />
            <el-table-column prop="role.roleName" label="角色" width="150" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row.loginId)">
                    编辑
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row.id,scope.row.photo)"
                    >
                    删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination small  style="margin-top: 10px;" background layout="prev, pager, next"
         :total="total" :page-size="7"  v-model:current-page="pageIndex" @current-change="loadList"></el-pagination>
        <EditUser ref="editRef" @sync-list="loadList"></EditUser>
    </div>
</template>

<script setup lang="ts">
    import EditUser from "../../components/user/EditUser.vue"
    import { onMounted, ref} from 'vue'
    import {$list,$getOne,$delete} from '../../api/admin.ts'
    import {$list as $roleList} from '../../api/role.ts'
    import { ElMessage, ElMessageBox ,ElNotification} from 'element-plus'
    import {baseURL_dev} from '../../config/baseURL.ts'
    import defaultImage from '@/assets/images/default.png';

    interface EditRef {
        drawer: boolean
        formData:object
    }

    interface User {
        id:number
        loginId:string,
        loginPwd:string
        name:string,
        phone:string,
        photo:string,
        role:object,
        roleId:number
    }
    interface Role {
        roleId:string
        roleName:string
    }

    // 页码
    let pageIndex = ref(1)
    let roleId = ref('0')

    let editRef = ref<EditRef | null>(null)

    // 用户列表
    let list = ref<User[]>([])
    // 总数量
    let total = ref(0)
    // 加载用户列表
    const loadList = async()=>{
        let {data,count} = await $list({
            pageIndex:pageIndex.value,
            pageSize:7,
            roleId:roleId.value
        })
        list.value = data
        total.value = count
    }


    // 角色列表
    let roleList = ref<Role[]>([])

    // 加载角色列表
    const loadRoleList = async ()=>{
        roleList.value = await $roleList()
        roleList.value.unshift({
            roleId:'0',
            roleName:'请选择角色'
        })
    }
    
    onMounted(()=>{
        loadList()
        loadRoleList()
    })


    const handleEdit = async (loginId:string) => {
        let ret = await $getOne({loginId})
        editRef.value!.drawer= true
        editRef.value!.formData = ret
    }

    const handleDelete = (id:number,photo:string) => {
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