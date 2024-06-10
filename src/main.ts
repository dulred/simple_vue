import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入pinia
import {createPinia} from 'pinia'


//引入element-ui    
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//导入路由器
import router from './router'
    
// 创建pinia
const pinia = createPinia()


createApp(App)
.use(router)
.use(ElementPlus)
.use(pinia)
.mount('#app')
