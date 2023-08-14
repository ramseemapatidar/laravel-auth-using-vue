<template>

    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">WebSiteName {{ token }}</a>
            </div>
            <ul class="nav navbar-nav">
                <li><router-link active-class="active" to="/">Home</router-link></li>
                <li><router-link to="/login" v-if="token==0">Login</router-link></li>
                <li><router-link to="/register" v-if="token==0">Register</router-link></li>
                <li><router-link to="/dashboard" v-if="token!=0">Dashboard</router-link></li>
            </ul>
        </div>
    </nav>
    <router-view></router-view>
</template>
<script>

import { UserStore } from '@/store/UserStore'
import { mapState } from 'pinia'
export default {
    computed:{
        ...mapState(UserStore,['token'])
    }
}
</script>
