<template>
    <div class="mine">
        <div class="left">        
            <el-image v-if="userStore.user.photo" fit="cover" style="width: 260px; height: 260px" :src="baseURL_dev + 'upload/admin/'+userStore.user.photo" />
            <el-image v-else :src="defaultImage" fit="cover" style="width: 260px; height: 260px" />
        </div>
        <div class="right">
            <p>账号: {{userStore.user.loginId }}</p>
            <p>姓名: {{userStore.user.name }}</p>
            <p>角色: {{userStore.user.role.roleName }}</p>
            <p>电话: {{userStore.user.phone }}</p>
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import {baseURL_dev} from '../../config/baseURL.ts'
    import useUser from '../../store/user.ts'
    import defaultImage from '@/assets/images/default.png';
    let userStore = useUser()
</script>

<style scoped lang="scss">
    .mine{
        display: flex;
        
        .left{
        }
        
        .right{
            margin-left: 10px;
            p{
                font-size: 20px;
                padding: 10px 0;
            }
        }
    }
</style>