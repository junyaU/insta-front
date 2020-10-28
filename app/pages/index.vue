<template>
  <section class="container">
    <AppHeader></AppHeader>
    <h1 class="title">Instagram</h1>
    <div>
      <form action="/api/signup" method="POST" class="login-form">
        <InputComponent label="名前" name="Name" type="text"></InputComponent>
        <InputComponent label="メールアドレス" name="Email" type="email"></InputComponent>
        <InputComponent label="パスワード" name="Password" type="password"></InputComponent>
        <SubmitButton></SubmitButton>
      </form>
    </div>
  </section>
</template>

<script>

export default {

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

</style>
