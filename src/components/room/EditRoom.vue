<template>
    <div>
        <el-drawer
            v-if="showDrawer"
            size="50%"
            v-model="drawer"
            :title="formData.id?'修改房型':'添加房型'"
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
            <el-form-item label="房间号" prop="roomId">
            <el-input v-model.number="formData.roomId" />
            </el-form-item>
            <el-form-item label="房间类型" prop="roomTypeId">
                <el-select
                v-model="formData.roomTypeId"
                placeholder="Select"
                style="width: 240px"
                >
                <el-option
                    v-for="item in typeList"
                    :key="item.roomTypeId"
                    :label="item.roomTypeName"
                    :value="item.roomTypeId"
                />
                </el-select>

            </el-form-item>
            <el-form-item label="房间状态" prop="roomStateId">
            <el-select
                v-model="formData.roomStateId"
                placeholder="Select"
                style="width: 240px"
                >
                <el-option
                    v-for="item in stateList"
                    :key="item.roomStateId"
                    :label="item.roomStateName"
                    :value="item.roomStateId"
                />
                </el-select>
            </el-form-item>
            <el-form-item label="房间描述" prop="description">
                <div style="border: 1px solid #ccc">
                    <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    mode="default"
                />
                <Editor
                    style="height: 300px; width:100%;"
                    v-model="formData.description"
                    :defaultConfig="editorConfig"
                    mode="default"
                    @onCreated="handleCreated"
                />
                </div>
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
    import { ref,reactive,watch,shallowRef,onBeforeUnmount,onMounted} from 'vue';
    import type { FormInstance, FormRules } from 'element-plus'
    import {$add,$update} from '../../api/room.ts'
    import { ElNotification } from 'element-plus'
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import {$list as $typeList} from '../../api/roomType.ts'
    import {$list2 as $stateList} from '../../api/roomState.ts'

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    const emit = defineEmits(['sync-list'])
    // 用于判断是否渲染抽屉
    const showDrawer = ref(false)
    // 抽屉变量
    let drawer = ref(false)


    // 房型列表
    let typeList = ref([])



    // 加载房型列表
    const loadTypeList = async ()=>{
        typeList.value = await $typeList()
        typeList.value.unshift({
            roomTypeId:0,
            roomTypeName: '请选择房型'
        })
    }
    
    // 房间状态列表
    let stateList = ref([])

    //加载房间状态列表
    const loadStateList = async()=>{
        stateList.value = await $stateList()
        stateList.value.unshift({
            roomStateId:0,
            roomStateName: '请选择状态'
        })
    }

    onMounted(()=>{
        loadTypeList()
        loadStateList()
    })



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
            id:0,
            roomId:'',
            roomTypeId: 0,
            roomStateId:0,
            description:'',
    })
    
    const handleClose = () => {
        drawer.value=false
        formRef.value?.resetFields()    
        // 清空表单数据
        formData.value = {
            id:0,
            roomId:'',
            roomTypeId: '',
            roomStateId:'',
            description:'',
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
        roomId: [{ validator: validateRolename, trigger: 'blur' }],
        roomTypeId: [{ validator: validateRolename, trigger: 'blur' }],
        roomStateId: [{ validator: validateRolename, trigger: 'blur' }],
        description: [{ validator: validateRolename, trigger: 'blur' }],
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
            id:0,
            roomId:'',
            roomTypeId: '',
            roomStateId:'',
            description:'',
        }
    }

    defineExpose({
        drawer,
        formData
    })

</script>

<style scoped>

</style>