<template>
  <div class="container">
      <AppHeader :session="sessionData"></AppHeader>
    <client-only placeholder="Loading…">
      <h1>Post Form</h1>
      <form :action="url + `/api/post`"  enctype="multipart/form-data" method="post">
        <InputPhoto></InputPhoto>
        <TextArea name="Comment"></TextArea>
        <SubmitButton></SubmitButton>
      </form>
    </client-only>
  </div>
</template>

<script>
export default {
async asyncData({app}){
    const sessionData = await app.$axios.$get(`/api/getsession`);
    return {sessionData}
  },
    computed: {
    url(){
      return process.env.API_URL
    }
  },
}
</script>
