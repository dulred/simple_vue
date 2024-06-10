<template>
    <div>
        <el-drawer
            v-if="showDrawer"
            size="30%"
            v-model="drawer"
            :title="formData.id?'修改用户':'添加用户'"
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
            <el-form-item v-if="!formData.id" label="账号" prop="loginId">
            <el-input v-model.number="formData.loginId" />
            </el-form-item>
            <el-form-item  v-if="!formData.id" label="密码" prop="loginPwd">
            <el-input type="password" v-model.number="formData.loginPwd" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
            <el-input v-model.number="formData.name" />
            </el-form-item>
            <el-form-item label="头像" prop="photo">
                <el-input v-model.number="formData.photo" />
                <el-upload
                    class="avatar-uploader"
                    :action="baseURL_dev + 'Admin/uploadImg'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="formData.photo" :src="baseURL_dev + 'upload/admin/'+formData.photo" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
                <el-select
                v-model="formData.roleId"
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
            </el-form-item>
            <el-form-item label="电话" prop="phone">
            <el-input v-model.number="formData.phone" />
            </el-form-item>

            <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">
                {{ formData.id?'修改':'添加'}}
            </el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
    </div>
</template>

<script setup lang="ts">
    import { ref,reactive,onMounted,watch} from 'vue';
    import type { FormInstance, FormRules,UploadProps } from 'element-plus'
    import {$list} from '../../api/role.ts'
    import {$add,$update} from '../../api/admin.ts'
    import { ElNotification,ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import {baseURL_dev} from '../../config/baseURL.ts'

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
                console.log("hello")
            }, 200)
        }
    })

    const formRef = ref<FormInstance>()
    let formData = ref({
        id:'',
        loginId:'',
        loginPwd:'',
        name:'',
        phone:'',
        photo:'',
        roleId:''
    })

    interface Role {
        roleId:string
        roleName:string
    }

    // 角色列表
    let roleList = ref<Role[]>([])

    // 加载角色列表
    const loadRoleList = async ()=>{
        roleList.value = await $list()
    }

    onMounted(() => {
        loadRoleList()
    })
        
    const handleClose = () => {
        drawer.value=false
        formRef.value?.resetFields()    
        // 清空表单数据
        formData.value = {
            id:'',
            loginId:'',
            loginPwd:'',
            name:'',
            phone:'',
            photo:'',
            roleId:''
        }
    }

    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        _uploadFile
        ) => {
        let {filename,success} = response
        if(success){
            ElNotification({
                title: '提示',
                message: '头像上传成功',
                type: 'error',
            })
            formData.value.photo = filename
        }
    
        }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        // 图片格式
        let imgTypes = ['image/jpeg','image/gif','image/png']
        if (!imgTypes.includes(rawFile.type)) {
            ElMessage.error('Avatar picture must be JPG format!')
            return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('Avatar picture size can not exceed 2MB!')
            return false
        }
        return true
    }


    // 验证角色名称
    const validateRolename = (_rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入内容'))
        } else {
            callback()
        }
    }

    // 验证对象
    const rules = reactive<FormRules<typeof formData>>({
        loginId: [{ validator: validateRolename, trigger: 'blur' }],
        loginPwd: [{ validator: validateRolename, trigger: 'blur' }],
        name: [{ validator: validateRolename, trigger: 'blur' }],
        phone: [{ validator: validateRolename, trigger: 'blur' }],
        photo: [{ validator: validateRolename, trigger: 'blur' }],
        roleId: [{ validator: validateRolename, trigger: 'blur' }],
    })


    // 提交表单
    const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        let ret
        if(formData.value.id){
            ret = await $add(formData.value)
        }else{
            ret = await $update(formData.value)
            formRef.value?.resetFields()
        }
        if (valid) {
            ElNotification({
                title: '提示',
                message: ret.message,
                type: 'success',
            })
                emit('sync-list')
                
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
            id:'',
            loginId:'',
            loginPwd:'',
            name:'',
            phone:'',
            photo:'',
            roleId:''
        }
    }

    defineExpose({
        drawer,
        formData
    })

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader{
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>