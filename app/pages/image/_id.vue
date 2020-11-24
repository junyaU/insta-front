<template>
  <div class="container">
    <client-only placeholder="Loading…">
      <AppHeader :session="sessionData"></AppHeader>
      <h1>プロフィール画像設定</h1>
      <form :action="url + `/api/upload`" method="post" enctype="multipart/form-data">
        <InputPhoto></InputPhoto>
        <input type="hidden" name="userId" :value="$route.params.id">
        <SubmitButton></SubmitButton>
      </form>
    </client-only>
  </div>
</template>

<script>
export default {
  async asyncData({app}){
    const sessionData = await app.$axios.$get(`/api/getsession`)
    return {sessionData}
  },
  computed: {
    url(){
      return process.env.API_URL
    }
  }
}
</script>

<style>

</style>