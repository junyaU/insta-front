<template>
  <div class="container">
    <AppHeader></AppHeader>
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

}
</script>

<style scoped>
.login-title{
  margin-bottom: 20px;
}
</style>