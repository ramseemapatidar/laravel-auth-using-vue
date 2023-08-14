import './bootstrap';
import {createApp} from 'vue'
import app from './layouts/app.vue'
import router from './router/router'
import { createPinia } from 'pinia'

createApp(app)
.use(router)
.use(createPinia())
.mount('#app')
