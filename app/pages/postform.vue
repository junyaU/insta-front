<template>
  <div class="container">
    <AppHeader></AppHeader>
    <h1>Post Form</h1>
    <form action="/api/post">
      <TextArea name="Comment"></TextArea>
      <input type="hidden" name="Image" value="jajajaj">
      <SubmitButton></SubmitButton>
    </form>
  </div>
</template>

<script>
export default {
async asyncData({app}){
    const sessData = await app.$axios.$get(`/api/getsession`)
    console.log(sessData)
    return {sessData}
  },
}
</script>

<style>

</style>