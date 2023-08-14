import { createWebHistory,createRouter } from "vue-router";
import home from '../pages/home.vue'
import login from '../pages/login.vue'
import register from '../pages/register.vue'
import dashboard from '../pages/dashboard.vue'
//import store from "../store";
import { UserStore } from '@/store/UserStore'
const routes = [
    {
        path :'/',
        name:'Home',
        component:home,
        meta:{
            requiresAuth:true,
        }
    },
    {
        path :'/login',
        name:'Login',
        component:login,
        meta:{
            requiresAuth:false,
        }
    },
    {
        path :'/register',
        name:'Register',
        component:register,
        meta:{
            requiresAuth:false,
        }
    },
    {
        path :'/dashboard',
        name:'Dashbaord',
        component:dashboard,
        meta:{
            requiresAuth:true,
        }
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to,from)=>{
    // if(to.meta.requiresAuth && !localStorage.getItem('token')){
    //     return '/';
    // }
    // if(to.meta.requiresAuth ==false && localStorage.getItem('token')){
    //     return '/dashboard';
    // }
    // if(to.meta.requiresAuth && store.getters.getToken==0){
    //     return '/login';
    // }
    // if(to.meta.requiresAuth ==false && store.getters.getToken!=0){
    //     return '/dashboard';
    // }
    let store = UserStore();

    if(to.meta.requiresAuth && store.token==0){
        return '/login';
    }
    if(to.meta.requiresAuth ==false && store.token !=0){
        return '/dashboard';
    }
})

export default router;
