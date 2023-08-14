import axios from 'axios'
import { defineStore } from 'pinia'

export const postStore = defineStore('post',{


    state : () =>({
        posts:[],
        title: null,
        description:null,
        edit_id:null,
        image:null,

        loading:false,
        url :'api/posts/'
    }),

    getters:{

       getToken : state =>state.token
    },
    actions:{
       async fetchPost(){
            this.posts = [];
            this.loading = true;
            try{
                let posts = await axios.get(this.url);
                this.posts = posts.data;
            }catch(error){
                console.log(error)
            }finally{
                this.loading = false;
            }
        },
        addPost(){
            console.log(this.title)
            if(this.title!='' && this.description!=''){
                let form_data = new FormData();
                form_data.append('title',this.title)
                form_data.append('description',this.description)
                form_data.append('image',this.image)
                let config = {
                    header :{
                        'Content-Type' : 'image/png'
                    }
                }
                if(this.edit_id>0){
                    form_data.append('_method','put')
                    axios.post(this.url+this.edit_id,form_data,config).then(res=>{

                        this.formReset();
                        this.fetchPost();
                    })

                }else{
                    axios.post(this.url,form_data,config).then(res=>{

                        this.formReset();
                        this.fetchPost();
                    })

                }

            }
        },
        editPost(id){

            let post = this.posts.find(post=>post.id ==id)
            if(post){
                this.title = post.title
                this.description = post.description
                this.edit_id = post.id
            }
        },
        deletePost(id){
            axios.delete(this.url+id).then(res=>{
                this.fetchPost();
            //    let index = this.posts.findIndex(post=>post.id ==id);
            //    this.posts.slice(index,1)
            })
        },
        changeImage(event){
            this.image = event.target.files[0]
        },
        formReset(){
            this.title = null,
            this.description =null,
            this.edit_id = null,
            this.image = null
        }
    },
  })

