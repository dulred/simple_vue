import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//引入element-ui    
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//导入路由器
import router from './router'

createApp(App)
.use(router)
.use(ElementPlus)
.mount('#app')
