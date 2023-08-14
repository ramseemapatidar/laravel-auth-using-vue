import { ref } from "vue";
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const UserStore = defineStore({
    id:'UserStoreId',

    state : () =>({
        token : localStorage.getItem('token') || 0,
        router:useRouter(),
        email: null,
        password :null,
        error: ref(''),
    }),

    getters:{

       getToken : state =>state.token
    },
    actions:{
        setToken : function(token){
            this.token = token
            localStorage.setItem('token',token);
        },

        removeToken : function (){
            this.token = 0
            localStorage.removeItem('token');

        },
         logout(){

            this.removeToken()
            this.router.push('/logout')
        },
        async login(){
            let form_data = {
                email: this.email,
               password: this.password,
            }
            await axios.post('/api/login/',form_data).then(res=>{
                if(res.data.authorization){
                    this.setToken(res.data.authorization.token)
                    this.router.push('/dashboard')
                }else{
                    error.ref = res.data.message;
                }
            })
        }
    },
  })

