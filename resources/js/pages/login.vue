<template>
    <div class="container">
        <h2>Login form</h2>

        <p class="text-danger" v-for="error in errors" :key="error">{{ error }}</p>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" v-model="email" placeholder="Enter email" name="email">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" v-model="password" placeholder="Enter password" name="pwd">
            </div>

            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { UserStore } from '@/store/UserStore'

const { email,password }  = storeToRefs(UserStore());
const { login } = UserStore();
</script>
