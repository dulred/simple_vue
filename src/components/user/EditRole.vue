<template>
    <div>
        <el-drawer
            v-if="showDrawer"
            size="30%"
            v-model="drawer"
            :title="formData.roleId?'修改角色':'添加角色'"
            direction="rtl"
            :before-close="handleClose"
        >   
        <el-form
            ref="formRef"
            size="small"
            :model="formData"
            status-icon
            :rules="rules"
            label-width="80px"
        >
            <el-form-item label="角色名称" prop="roleName">
            <el-input v-model.number="formData.roleName" />
            </el-form-item>

            <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">
                {{ formData.roleId?'修改':'添加'}}
            </el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
    </div>
</template>

<script setup lang="ts">
    import { ref,reactive,watch } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus'
    import {$add,$update} from '../../api/role.ts'
    import { ElNotification } from 'element-plus'
    const emit = defineEmits(['sync-list'])
    // 用于判断是否渲染抽屉
    const showDrawer = ref(false)
    // 抽屉变量
    let drawer = ref(false)

    watch(drawer,(nval)=>{
        if(nval){
            showDrawer.value = true
        }else{
            setTimeout(()=>{
                showDrawer.value = false
            }, 200)
        }
    })
    const formRef = ref<FormInstance>()
    let formData = ref({
        roleId:'',
        roleName: ''
    })
    
    const handleClose = () => {
        drawer.value=false
        formRef.value?.resetFields()    
        // 清空表单数据
        formData.value = {
            roleId:'',
            roleName: ''
        }
    }

    // 验证角色名称
    const validateRolename = (_rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入角色名称'))
        } else {
            callback()
        }
    }

    // 验证对象
const rules = reactive<FormRules<typeof formData>>({
    roleName: [{ validator: validateRolename, trigger: 'blur' }],
})

    // 提交表单
    const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        let ret
        if(formData.value.roleId){
            ret = await $add(formData.value)
        }else{
            ret = await $update(formData.value)
        }
        if (valid) {
            ElNotification({
                title: '提示',
                message: ret.message,
                type: 'success',
            })
            emit('sync-list')
            formRef.value?.resetFields()
        } else {
         ElNotification({
                title: '提示',
                message: ret.message,
                type: 'error',
            })
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

    defineExpose({
        drawer,
        formData
    })

</script>

<style scoped>

</style>