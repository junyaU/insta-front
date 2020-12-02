<template>
  <div>
      <h1>ログアウト</h1>
      <p class="logout-text">このアカウントからログアウトします。<br>
        よろしければ下のボタンを押してください。</p>
      <SubmitButton @click.native="logout"></SubmitButton>
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