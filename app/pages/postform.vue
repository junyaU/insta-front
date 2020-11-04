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

}
</script>

<style>

</style>