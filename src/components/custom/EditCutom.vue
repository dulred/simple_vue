<template>
    <div>
        <el-drawer
            v-if="showDrawer"
            size="50%"
            v-model="drawer"
            :title="formData.guestId?'修改房型':'添加房型'"
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
            <el-form-item label="身份证号" prop="identityId">
            <el-input v-model="formData.identityId" />
            </el-form-item>
            <el-form-item label="顾客姓名" prop="guestName">
            <el-input v-model="formData.guestName" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
            <el-input v-model="formData.phone" />
            </el-form-item>
            <el-form-item label="房间类型" prop="roomTypeId">
            <el-select
                v-model="formData.roomTypeId"
                placeholder="Select"
                style="width: 240px"
                @change="changeType"
                >
                <el-option
                    v-for="item in typeList"
                    :key="item.roomTypeId"
                    :label="item.roomTypeName"
                    :value="item.roomTypeId"
                />
                </el-select>
            </el-form-item>
            <el-form-item label="房间号" prop="roomId">
            <el-select

                v-model="formData.roomId"
                placeholder="Select"
                style="width: 240px"
                >
                <el-option
                    v-for="item in roomList"
                    :key="item.roomId"
                    :label="item.roomName"
                    :value="item.roomId"
                />
                </el-select>
            </el-form-item>
            <el-form-item label="入住日期" prop="resideDate">
            <el-date-picker
                v-model="formData.resideDate"
                type="datetime"
                placeholder="Pick a date"
            />
            
            </el-form-item>
            <el-form-item label="押金" prop="deposit">
            <el-input v-model.number="formData.deposit" />
            </el-form-item>
            <el-form-item label="入住人数" prop="guestNum">
            <el-input v-model.number="formData.guestNum" />
            </el-form-item>
  
            <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">
                {{ formData.guestId?'修改':'添加'}}
            </el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
    </div>
</template>

<script setup lang="ts">
    import { ref,reactive,watch,onMounted} from 'vue';
    import type { FormInstance, FormRules } from 'element-plus'
    import {$add,$update} from '../../api/guest.ts'
    import {$list as $typeList} from '../../api/roomType.ts'
    import {$list as $roomList} from '../../api/room.ts'
    import { ElNotification } from 'element-plus'

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
    
    // 房间列表
    let roomList = ref([])

    //加载房间状态列表
    const loadRoomList = async(roomId)=>{
        let {data} = await $roomList({
            roomId,
            roomStateId:1,
            pageSize:100
        })
        let ret = data.map(r=>{
            return {
                roomId:r.roomId,
                roomName:r.roomId + '号房间'
            }
        })
       ret.unshift({
        roomId:'',
        roomName:'请选择房间'
       })
       roomList.value = ret
    }

    const formRef = ref<FormInstance>()
    let formData = ref({
            identityId:'',
            guestName:'',
            phone: '',
            roomTypeId:0,
            roomId:0,
            resideDate:'',
            deposit:'',
            guestNum:''
    })

    const changeType = (roomTypeId)=>{
        formData.value.roomId=0
        if(roomTypeId > 0){
            loadRoomList(roomTypeId)
        }
    }

    onMounted(()=>{
        loadTypeList()
    })

    
    watch(drawer,(nval)=>{
        if(nval){
            showDrawer.value = true
        }else{
            setTimeout(()=>{
                showDrawer.value = false
            }, 200)
        }
    })

    
    const handleClose = () => {
        drawer.value=false
        formRef.value?.resetFields()    
        // 清空表单数据
        formData.value = {
            identityId:'',
            guestName:'',
            phone: '',
            roomTypeId:'',
            roomId:'',
            resideDate:'',
            deposit:'',
            guestNum:''
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
        identityId: [{ validator: validateRolename, trigger: 'blur' }],
        guestName: [{ validator: validateRolename, trigger: 'blur' }],
        phone: [{ validator: validateRolename, trigger: 'blur' }],
        roomTypeId: [{ validator: validateRolename, trigger: 'blur' }],
        roomId: [{ validator: validateRolename, trigger: 'blur' }],
        resideDate: [{ validator: validateRolename, trigger: 'blur' }],
        deposit: [{ validator: validateRolename, trigger: 'blur' }],
        guestNum: [{ validator: validateRolename, trigger: 'blur' }]
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
            identityId:'',
            guestName:'',
            phone: '',
            roomTypeId:'',
            roomId:'',
            resideDate:'',
            deposit:'',
            guestNum:''
        }
        roomList.value=[]
    }

    defineExpose({
        drawer,
        formData
    })

</script>

<style scoped>

</style>