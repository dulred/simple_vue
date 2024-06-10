<template>
    <div class="setpwd">
        <el-form
            ref="formRef"
            size="small"
            :model="formData"
            status-icon
            :rules="rules"
            label-width="80px"
        >
            <el-form-item label="原始密码" prop="oldLoginPwd">
            <el-input type="password" v-model.number="formData.oldLoginPwd" />
            </el-form-item>
            <el-form-item label="新的密码" prop="newLoginPwd">
            <el-input type="password"  v-model.number="formData.newLoginPwd" />
            </el-form-item>
            <el-form-item label="确认密码" prop="newLoginPwd2">
            <el-input type="password"  v-model.number="formData.newLoginPwd2" />
            </el-form-item>


            <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">
                确认
            </el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { ref,reactive } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus'
    import {$resetPwd} from '../../api/admin.ts'
    import { ElNotification } from 'element-plus'
    import useUser from '../../store/user.ts'
    let userUser = useUser()
    const formRef = ref<FormInstance>()
    let formData = ref({
        id:'',
        oldLoginPwd:'',
        newLoginPwd:'',
        newLoginPwd2:''
    })

    // 验证旧密码
    const validateOldLoginPwd = (_rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入旧密码'))
        } else {
            callback()
        }
    }
    // 验证新密码
    const validateNewLoginPwd = (_rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入新密码'))
        } else {
            callback()
        }
    }
    // 验证确认密码
    const validateNewLoginPwd2 = (_rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入确认密码'))
        }else if(value!==formData.value.newLoginPwd){
            callback(new Error('两次密码输入不一致'))
        }
         else {
            callback()
        }
    }

    // 验证对象
    const rules = reactive<FormRules<typeof formData>>({
        oldLoginPwd: [{ validator: validateOldLoginPwd, trigger: 'blur' }],
        newLoginPwd: [{ validator: validateNewLoginPwd, trigger: 'blur' }],
        newLoginPwd2: [{ validator: validateNewLoginPwd2, trigger: 'blur' }]
    })

    // 提交表单
    const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            formData.value.id = userUser.user.id
            let ret = await $resetPwd({...formData.value})
            if(ret.success){
                ElNotification({
                title: '提示',
                message: ret.message,
                type: 'success',
            })
            } else {
            ElNotification({
                    title: '提示',
                    message: ret.message,
                    type: 'error',
                })
            }
        }
    })
    }
    // 重置表单
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
        // 清空表单数据
        formData.value = {
            roleId:'',
            roleName: ''
        }
    }
</script>

<style scoped lang="scss">

</style>