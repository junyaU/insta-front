<template>
  <section class="container">
    <AppHeader :session="sessionData"></AppHeader>
    <h1 class="title">Instagram</h1>
    <p class="register-text">アカウントを登録する</p>
    <div>
      <form action="/api/signup" method="POST" class="login-form">
        <InputComponent label="名前" name="Name" type="text"></InputComponent>
        <InputComponent label="メールアドレス" name="Email" type="email"></InputComponent>
        <InputComponent label="パスワード" name="Password" type="password"></InputComponent>
        <SubmitButton></SubmitButton>
        <nuxt-link to="/login">
          <p class="login-text">アカウントをお持ちの方はこちらから</p>
        </nuxt-link>
      </form>
    </div>
  </section>
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

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #35495e;
  letter-spacing: 1px;
}

.login-form{
  margin-top: 20px;
}

a{
  text-decoration: none;
}

.login-text{
  margin-top: 10px;
}

.register-text{
  font-size: 20px;
  font-weight: 500;
}
</style>
