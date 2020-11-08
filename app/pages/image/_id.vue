<template>
  <div class="container">
    <AppHeader></AppHeader>
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

}
</script>

<style>

</style>