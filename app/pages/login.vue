<template>
  <div class="container">
    <client-only placeholder="ok">
      <AppHeader></AppHeader>
      <h1 class="login-title">Login</h1>
      <InputComponent label="メールアドレス" type="email" classname="email-input"></InputComponent>
      <InputComponent label="パスワード" type="password" classname="password-input"></InputComponent>
      <SubmitButton @click.native="login"></SubmitButton>
      <nuxt-link to="/">
        <p class="to-signup">アカウントを持っていない方はこちらから</p>
      </nuxt-link>
    </client-only>
  </div>
</template>

<script>
export default {
  methods:{
    async login(){
      const email = document.querySelector(".email-input");
      const password = document.querySelector(".password-input");
      const apiUrl = "/api/login";
      const getSessionUrl = "/api/getsession";
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

      const login = await this.$axios.post(apiUrl, formData);

      if(login.data.status == "success"){
        const sessiondata = await this.$axios.get(getSessionUrl);
        this.$store.commit('session/add', sessiondata.data);
        this.$router.push("/posthome");
      }else{
        alert("ログインに失敗しました")
        email.value = "";
        password.value = "";
      }
    }
  }
}
</script>

<style scoped>
.login-title{
  margin-bottom: 20px;
}

.to-signup{
  margin-top: 10px;
}
</style>