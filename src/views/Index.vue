<template>
    <div class="index" >
        <div class="left">
            <h2>酒店系统信息管理平台</h2>
            <el-menu
            router
        active-text-color="#ffd04b"
        background-color="#142334"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
            <span>账户管理</span>
          </template>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/user">用户管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon> 
            <span>客房管理</span>
          </template>
          <el-menu-item index="/roomtype">房型管理</el-menu-item>
          <el-menu-item index="/room">房间管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon> 
            <span>客户管理</span>
          </template>
          <el-menu-item index="/livein">入住管理</el-menu-item>
          <el-menu-item index="/order">客户订单</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon> 
            <span>系统管理</span>
          </template>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/dictionary">字典管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
        </div>
        <div class="right">
            <div class="top">
                    <el-menu
                  :default-active="activeIndex"
                    router
          :ellipsis="false"
          mode="horizontal"
          active-text-color="#ffd04b"
          background-color="#142334"
          text-color="#fff"
        >
          <el-menu-item index="/index">
            <el-icon> <HomeFilled /> </el-icon>
            首页
          </el-menu-item>
          <el-menu-item index="/mail">
            <el-icon> <Message /> </el-icon>
            邮件
          </el-menu-item>
          <el-menu-item index="/message">
            <el-icon> <ChatDotSquare /> </el-icon>
            消息
          </el-menu-item>
          <el-sub-menu index="4">
            <template #title>
              <el-icon> <Avatar /> </el-icon>
              {{userStore.user.name}}
            </template>
            <el-menu-item index="/mine">个人中心</el-menu-item>
            <el-menu-item index="/setpwd">修改密码</el-menu-item>
            <el-menu-item index="" @click="exit">退出系统</el-menu-item>
          </el-sub-menu>
        </el-menu>
            </div>
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue'
import {useRouter} from 'vue-router'
import { User,Location,HomeFilled,Message,ChatDotSquare,Avatar} from '@element-plus/icons-vue'
import useUser from "../store/user.ts"
import { ElMessage, ElMessageBox } from 'element-plus'

let userStore = useUser()
let router = useRouter()

// 提供默认的激活菜单
const activeIndex = ref('/index')
// 拦截进入登录页面
onMounted(()=>{
  if(!userStore.user.loginId){
    router.push('/')
  }
})

// 退出登录系统
let exit = ()=>{

  ElMessageBox.confirm(
    '确定退出系统吗?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      userStore.clearUser()
      router.push('/')
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出',
      })
    })


}


</script>

<style scoped lang="scss">
.index{
    width: 100vw;
    height: 100vh;
    display: flex;
    
    .left{
        width: 200px;
        background-color: #142334;
        color: #fff;

        .el-menu{
          border-right: none;
        }

        h2{
            font-size: 18px;    
            font-family: "bing";
            text-align: center;
            height: 60px;
            line-height: 60px;
        }
    }

    .right{
        flex: 1;
        display: flex;
        flex-direction: column;

        .top{
            height: 60px;
            background-color: #142334;
            color: #fff;
            display: flex;
            justify-content: flex-end;
            .el-menu{
              border-bottom: none;
            }
        }
        .content{
            flex: 1;
        }
    }

}
</style>