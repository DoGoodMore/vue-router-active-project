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
      <button>点击登录</button>
    </div>
</template>

<script>
    export default {
        name: "login",
      data() {
          return {
            form: {
              username: '',
              password: ''
            }
          }
      }
    }
</script>

<style scoped>

</style>
