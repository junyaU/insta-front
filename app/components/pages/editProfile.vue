<template>
  <div class="container">
    <InputComponent type="text" label="名前" classname="input-name"></InputComponent>
    <InputComponent type="email" label="メールアドレス" classname="input-email"></InputComponent>
    <SubmitButton @click.native="updateProfile"></SubmitButton>
  </div>
</template>

<script>
export default {
    computed:{
    sessionUserId(){
      const sessionExist = this.$store.state.session.data[0];
      const data = sessionExist ? this.$store.state.session.data[0].Id : 0;
      return data;
    }
  },
  methods:{
  async updateProfile(){
    const apiUrl = "/api/auth/editprofile";
      const nameDom = document.querySelector(".input-name");
      const emailDom = document.querySelector(".input-email");
      const userId = this.sessionUserId;
      const emailCheck = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      const formData = new FormData();

      if(!userId){
        alert("ログインされていません");
        return;
      }

      if(!nameDom.value ||!emailDom.value.match(emailCheck)){
        alert("不正な値が入力されています");
        return;
      }

      formData.append("UserId", userId);
      formData.append("Name", nameDom.value);
      formData.append("Email", emailDom.value);

      const editData = await this.$axios.post(apiUrl, formData);
      if(editData.status == 200){
        alert("プロフィールが更新されました");
      this.$router.push("/posthome");
      }else{
        alert("プロフィールの更新に失敗しました。");
      }
    },
  }
}
</script>