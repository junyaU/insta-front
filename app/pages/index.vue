<template>
  <section class="container">
    <AppHeader :session="sessionData"></AppHeader>
    <h1 class="title">Instagram</h1>
    <p class="register-text">アカウントを登録する</p>
    <div>
      <InputComponent label="名前" type="text" classname="name-input"></InputComponent>
      <InputComponent label="メールアドレス" type="email" classname="email-input"></InputComponent>
      <InputComponent label="パスワード" type="password" classname="password-input"></InputComponent>
      <InputComponent label="パスワード確認" type="password" classname="repassword-input"></InputComponent>
      <p class="password-text">※パスワードは8文字以上で入力してください。</p>
      <SubmitButton @click.native="signUp"></SubmitButton>
      <nuxt-link to="/login">
        <p class="login-text">アカウントをお持ちの方はこちらから</p>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({app}){
    const sessionData = await app.$axios.$get(`/api/getsession`)
    return {sessionData}
  },

  methods:{
    async signUp(){
      const name = document.querySelector(".name-input");
      const email = document.querySelector(".email-input");
      const password = document.querySelector(".password-input");
      const repassword = document.querySelector(".repassword-input");
      const apiUrl = "/api/signup"
      const formData = new FormData();
      const emailCheck = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

      if(!name.value){
        alert("名前を１文字以上入力してください");
        return;
      }

      if(!email.value.match(emailCheck)){
        alert("有効なメールアドレスを入力してください");
        return;
      }

      if(password.value.length < 8){
        alert("パスワードは８文字以上で入力してください");
        password.value = "";
        repassword.value = "";
        return;
      }

      if(password.value != repassword.value){
        alert("パスワードが一致していません");
        password.value = "";
        repassword.value = "";
        return;
      }

      formData.append("Name", name.value);
      formData.append("Email", email.value);
      formData.append("Password", password.value);
      formData.append("Repassword", repassword.value);

      const signup = await this.$axios.post(apiUrl, formData);
      if(signup.data.status == "success"){
        alert("ログインに成功しました");
        this.$router.push("/posthome");
      }else{
        alert("そのメールアドレスは既に使われています");
      }


    }
  },

  mounted(){
    console.log(this.$store.state.session.data)
  }

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

.password-text{
  margin-bottom: 20px;
}
</style>
