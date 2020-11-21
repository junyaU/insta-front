<template>
  <div class="container">
    <client-only placeholder="Loading…">
      <AppHeader :session="sessionData"></AppHeader>
      <h1 class="login-title">Login</h1>
      <form :action="url + `/api/login`" method="POST">
        <InputComponent label="メールアドレス" name="Email" type="email"></InputComponent>
        <InputComponent label="パスワード" name="Password" type="password"></InputComponent>
        <SubmitButton></SubmitButton>
      </form>
    </client-only>
  </div>
</template>

<script>
export default {
  async asyncData({app}){
    const sessionData = await app.$axios.$get(`/api/getsession`)
    return {sessionData}
  },
  computed: {
    url(){
      return process.env.API_URL
    }
  }
}
</script>

<style scoped>
.login-title{
  margin-bottom: 20px;
}
</style>