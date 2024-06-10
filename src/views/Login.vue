<template>
    <div class="login">
        <div class="box">
            <h2>酒店系统信息管理平台</h2>
            <el-form
    ref="formRef"
    size="small"
    :model="formData"
    status-icon
    :rules="rules"
    label-width="40px"
  >
    <el-form-item label="账号" prop="loginId">
      <el-input v-model.number="formData.loginId" />
    </el-form-item>
    <el-form-item label="密码" prop="loginPwd">
      <el-input v-model="formData.loginPwd" type="password"  />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">
        登录
      </el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
//导入路由器
import {useRouter} from 'vue-router'

// 导入pinia中user全局状态
import useUser from '../store/user.ts'

// 导入请求api
import {$Login,$getOne } from '../api/admin'

// 获取user全局状态
const userStore = useUser()
// 使用路由
const router = useRouter()

const formRef = ref<FormInstance>()

const formData = reactive({
    loginId: '',
    loginPwd: ''
})

onMounted(()=>{
  if(userStore.user.loginId){
    router.push('/index')
  }
})

// 验证账号
const validateLoginId = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}

// 验证密码
const validateLoginPwd = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
// 验证对象
const rules = reactive<FormRules<typeof formData>>({
    loginId: [{ validator: validateLoginId, trigger: 'blur' }],
    loginPwd: [{ validator: validateLoginPwd, trigger: 'blur' }]
})

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
        let ret = await $Login({...formData})
        if(ret) {
          let user = $getOne({LoginId: formData.loginId})
          userStore.setUser(user)
          // 将用户信息存储到浏览器缓存
          sessionStorage.setItem('user',JSON.stringify(user))
          // 跳转到首页
          router.push('/index')
        }
    } else {
      console.error('验证过程中出现错误');
    }
  })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
    .login {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(to bottom, #142334, #6894c7);
        display: flex;
        justify-content: center;
        align-items: center;

    .box{
        width: 400px;
        border: 1px solid #fff;
        padding: 20px;
        h2{
            color: #fff;
            font-size: 20px;
            text-align: center;
            margin-bottom: 20px;
            font-family: "bing";
        }
        ::v-deep .el-form-item__label{
            color:#fff;
        }
    }
    }
  
</style>