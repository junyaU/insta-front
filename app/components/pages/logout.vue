<template>
  <div class="container">
    <h1 class="config-header">ログアウト</h1>
    <p class="logout-text">アカウントからログアウトします。<br>
      下のボタンを押してください。</p>
    <SubmitButton @click.native="logout" class="config-submit-button"></SubmitButton>
  </div>
</template>

<script>
export default {
  methods:{
    async logout(){
      const apiUrl = "/api/logout";
      const logout = await this.$axios.get(apiUrl);
      this.$store.commit("session/delete");
      this.$router.push("/");
    },
  }
}
</script>