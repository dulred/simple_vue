<template>
  <router-view/>
</template>
<script lang="ts" setup>
import useStore from './store/user.ts'
const userStore = useStore()
let user: string | null | object = sessionStorage.getItem('user');
if(user){
  user = JSON.parse(user) as object
  userStore.setUser(user)
}

</script>