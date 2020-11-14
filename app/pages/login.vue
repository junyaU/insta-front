<template>
  <div class="container">
    <AppHeader :session="sessionData"></AppHeader>
    <h1 class="login-title">Login</h1>
    <form action="/api/login" method="POST">
      <InputComponent label="メールアドレス" name="Email" type="email"></InputComponent>
      <InputComponent label="パスワード" name="Password" type="password"></InputComponent>
      <SubmitButton></SubmitButton>
    </form>
  </div>
</template>

<script>
export default {
  async asyncData({app}){
    const sessionData = await app.$axios.$get(`/api/getsession`)
    console.log(sessionData)
    return {sessionData}
  },
}
</script>

<style scoped>
.login-title{
  margin-bottom: 20px;
}
</style>