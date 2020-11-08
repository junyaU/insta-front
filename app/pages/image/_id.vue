<template>
  <div class="container">
    <AppHeader :session="sessionData"></AppHeader>
    <h1>プロフィール画像設定</h1>
    <form action="/api/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="Image">
      <input type="hidden" name="userId" :value="$route.params.id">
      <SubmitButton></SubmitButton>
    </form>
  </div>
</template>

<script>
export default {
  async asyncData({app}){
    const sessionData = await app.$axios.$get(`/api/getsession`)
    console.log(sessionData)
    return {sessionData}
  },
}
</script>

<style>

</style>