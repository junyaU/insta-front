<template>
  <div class="container">
    <AppHeader></AppHeader>
    <h1>Post Form</h1>
    <form action="/api/post"  enctype="multipart/form-data" method="post">
      <TextArea name="Comment"></TextArea>

      <InputComponent label="画像" name="Image" type="file"></InputComponent>
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