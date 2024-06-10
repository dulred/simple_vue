<template>
    <div>
        <el-drawer
            v-if="showDrawer"
            size="50%"
            v-model="drawer"
            :title="formData.roomTypeId?'修改房型':'添加房型'"
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
            <el-form-item label="床位数量" prop="bednum">
            <el-input v-model.number="formData.bednum" />
            </el-form-item>
            <el-form-item label="房型名称" prop="roomTypeName">
                <el-input v-model.number="formData.roomTypeName" />
            </el-form-item>
            <el-form-item label="房型价格" prop="roomTypePrice">
            <el-input v-model.number="formData.roomTypePrice" />
            </el-form-item>
            <el-form-item label="房型描述" prop="typeDescription">
                <div style="border: 1px solid #ccc">
                    <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    mode="default"
                />
                <Editor
                    style="height: 300px; width:100%;"
                    v-model="formData.typeDescription"
                    :defaultConfig="editorConfig"
                    mode="default"
                    @onCreated="handleCreated"
                />
                </div>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">
                {{ formData.roomTypeId?'修改':'添加'}}
            </el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
    </div>
</template>

<script setup lang="ts">
    import { ref,reactive,watch,shallowRef,onBeforeUnmount} from 'vue';
    import type { FormInstance, FormRules } from 'element-plus'
    import {$add,$update} from '../../api/roomType.ts'
    import { ElNotification } from 'element-plus'
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    const emit = defineEmits(['sync-list'])
    // 用于判断是否渲染抽屉
    const showDrawer = ref(false)
    // 抽屉变量
    let drawer = ref(false)


    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor:any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    
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
            bednum:'',
            roomTypeName: '',
            roomTypePrice:'',
            typeDescription:'',
            roomTypeId:''
    })
    
    const handleClose = () => {
        drawer.value=false
        formRef.value?.resetFields()    
        // 清空表单数据
        formData.value = {
            bednum:'',
            roomTypeName: '',
            roomTypePrice:'',
            typeDescription:''
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
        bednum: [{ validator: validateRolename, trigger: 'blur' }],
        roomTypeName: [{ validator: validateRolename, trigger: 'blur' }],
        roomTypePrice: [{ validator: validateRolename, trigger: 'blur' }],
        typeDescription: [{ validator: validateRolename, trigger: 'blur' }],
    })

    // 提交表单
    const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        let ret
        if(formData.value.roomTypeId){
            ret = await $add(formData.value)
            formRef.value?.resetFields()
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
            bednum:'',
            roomTypeName: '',
            roomTypePrice:'',
            typeDescription:''
        }
    }

    defineExpose({
        drawer,
        formData
    })

</script>

<style scoped>

</style>