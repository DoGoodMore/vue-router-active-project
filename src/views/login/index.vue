<template>
    <div>
      <label for="username">用户名:</label>
      <input type="text"
             id="username"
             v-model="form.username">
      <br>
      <label for="password">密码:</label>
      <input type="password"
             id="password"
             v-model="form.password">
      <br>
      <button @click="loginByUsername( form )">点击登录</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex' ;
    export default {
        name: "login",
      data() {
          return {
            form: {
              username: '',
              password: ''
            }
          }
      },
      methods: {
        ...mapActions( [ 'loginByUsername' ] )
      }
    }
</script>

<style scoped>

</style>
