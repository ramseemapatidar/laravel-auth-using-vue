<template>
    <div class="container pt-2">
        <h2>Dashboard</h2>
        <button type="button" class="btn btn-dark mt-2" @click="logout">Logout</button>
        <div class="text-center" v-if="loading">
            <div class="spinner-loading position-absolute" role="status">
                <span class="">Loading....</span>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6" v-for="post in posts" :key="post.id">
                        <div class="card mt-2" v-if="post.image">
                            <img :src="`images/${post.image}`" alt="">
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">{{post.title}}</h4>
                            <small class="text-muted">20 minit age</small>
                            <p class="card-text">{{post.description}}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between bg-transparent border-top-0">

                            <buttton class="btn btn-default btn-sm" @click="editPost(post.id)">Edit</buttton>
                            <buttton class="btn btn-danger btn-sm" @click="deletePost(post.id)">Delete</buttton>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <form method="post" @submit.prevent="addPost">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="title" placeholder="Title">
                            </div>
                            <div class="form-group">
                               <textarea class="form-control" v-model="description" cols="30" rows="10" placeholder="Description"></textarea>
                            </div>
                            <div class="form-group">
                                <input type="file" class="form-control" placeholder="Title" @change="changeImage($event)">
                            </div>
                            <button type="submit" class="btn btn-dark">{{edit_id? 'Updated' : 'Save'}}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import {storeToRefs } from 'pinia'
import { UserStore } from '@/store/UserStore'
import { postStore } from '@/store/postStore'


const {posts,title,description,edit_id,loading} = storeToRefs(postStore());
const { addPost,fetchPost,editPost,changeImage,deletePost } = postStore();
const { logout } = UserStore();
fetchPost();
</script>
