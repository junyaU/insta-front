<template>
  <div class="container">
    <client-only placeholder="Loading…">
      <AppHeader :session="sessionData"></AppHeader>
      <h1 class="login-title">Login</h1>
      <InputComponent label="メールアドレス" name="Email" type="email" classname="email-input"></InputComponent>
      <InputComponent label="パスワード" name="Password" type="password" classname="password-input"></InputComponent>
      <SubmitButton @click.native="login"></SubmitButton>
    </client-only>
  </div>
</template>

<script>
export default {
  async asyncData({app}){
    const sessionData = await app.$axios.$get(`/api/getsession`)
    return {sessionData}
  },
  methods:{
    async login(){
      const email = document.querySelector(".email-input");
      const password = document.querySelector(".password-input");
      const apiUrl = "/api/login";
      const formData = new FormData();
      const emailCheck =  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

      if(!email.value.match(emailCheck)){
        alert("有効なメールアドレスを入力してください")
        return;
      }

      if(password.value.length < 8){
        alert("パスワードは８文字以上で入力してください");
        password.value = "";
        return;
      }

      formData.append("Email", email.value);
      formData.append("Password", password.value);

      await this.$axios.post(apiUrl, formData).then(res =>{
        if(res.data.status == "success"){
          alert("ログインに成功しました")
          this.$router.push("/posthome");
        }else{
          alert("ログインに失敗しました")
          email.value = "";
          password.value = "";
        }
      })
    }
  }
}
</script>

<style scoped>
.login-title{
  margin-bottom: 20px;
}
</style>