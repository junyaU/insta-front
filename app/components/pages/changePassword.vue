<template>
  <div>
    <h1 class="config-header">パスワード変更</h1>
    <InputComponent type="password" label="現在のパスワード" classname="now-password"></InputComponent>
    <InputComponent type="password" label="新しいパスワード" classname="new-password"></InputComponent>
    <InputComponent type="password" label="新しいパスワードを確認" classname="re-password"></InputComponent>
    <SubmitButton @click.native="changePassword" class="config-submit-button"></SubmitButton>
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
      async changePassword(){
      const apiUrl =  "/api/auth/changepassword";
      const userId = this.sessionUserId;
      const nowPassword = document.querySelector(".now-password");
      const newPassword = document.querySelector(".new-password");
      const rePassword = document.querySelector(".re-password");
      const formData = new FormData();

      if(!nowPassword.value || !newPassword.value || !rePassword.value){
        alert("入力されていない項目があります。");
        return;
      }

      if(newPassword.value.length < 8){
        alert('パスワードは８文字以上で入力してください。');
        return;
      }

      if(newPassword.value != rePassword.value){
        alert('パスワードの値が一致しません。');
        return;
      }

      formData.append("UserId", userId);
      formData.append("NewPassword", newPassword.value);
      formData.append("NowPassword", nowPassword.value);

      const passwordData = await this.$axios.post(apiUrl, formData);
      if(passwordData.status == 200){
        alert("パスワードの変更に成功しました。")
        this.$router.push("/posthome");
      }else{
        alert("現在のパスワードが間違っています。");
      }
    },
  }
}
</script>