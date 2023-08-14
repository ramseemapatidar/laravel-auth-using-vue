<template>
    <div class="container">
        <h2>Login form</h2>

        <p class="text-danger" v-for="error in errors" :key="error">{{ error }}</p>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" v-model="form.email" placeholder="Enter email" name="email">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" v-model="form.password" placeholder="Enter password" name="pwd">
            </div>

            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
</template>
<script>
import { reactive,ref } from "vue";
import { useRouter } from 'vue-router'
import { UserStore } from '@/store/UserStore'
export default{
    setup(){

        let form = reactive({
            email:'',
            password:'',
        });
        let error = ref('');
        let router = useRouter();
        let store = UserStore();
        let login = async()=>{
            await axios.post('/api/login/',form).then(res=>{
                if(res.data.authorization){
                    store.setToken(res.data.authorization.token)
                    router.push('/dashboard')
                }else{
                    error.ref = res.data.message;
                }
            })
        }
        return{
            form,
            login,
            error,
        }

    }
}
</script>
