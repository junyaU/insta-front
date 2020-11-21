<template>
  <div class="container">
    <client-only placeholder="Loading…">
      <AppHeader :session="sessionData"></AppHeader>
      <h1>Post Form</h1>
      <form :action="url + `/api/post`"  enctype="multipart/form-data" method="post">
        <TextArea name="Comment"></TextArea>
        <InputComponent label="pngファイルを登録してください" name="Image" type="file"></InputComponent>
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
