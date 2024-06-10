import {defineStore} from 'pinia'

export default defineStore('user',{
    state(){
        return{
            user:{
                loginId:"",
                loginPwd:"",
                name: "",
                phone:"",
                photo:"",
                role:{roleId:1,roleName:''},
                roleId:1
            }
        }
    },
    actions:{
        setUser(user:object) {
            this.user = user;
        },
        clearUser(){
            sessionStorage.clear()
            this.user = {
                loginId:''
            }
        }
    }
})