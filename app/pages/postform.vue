<template>
  <div class="container">
      <AppHeader :session="sessionData"></AppHeader>
    <client-only placeholder="Loading…">
      <h1>Post Form</h1>
      <InputPhoto classname="image-input"></InputPhoto>
      <TextArea classname="text-input"></TextArea>
      <SubmitButton @click.native="post"></SubmitButton>
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
  methods: {
    async post(){
      const apiUrl = "/api/post";
      const textDom = document.querySelector(".text-input");
      const imageDom = document.querySelector(".image-input");
      const image = imageDom.files[0];
      const formData = new FormData();
      const imageCheck = ".png|.jpg|.jpeg|.gif";

      if(!image){
        alert("画像が選択されていません");
        return;
      }

      if(!image.name.match(imageCheck)){
        alert("jpg、png、gifファイルを選択してください");
        return
      }

      formData.append("Comment", textDom.value);
      formData.append("Image", image);

      await this.$axios.post(apiUrl, formData).then(() => {
        alert("正常に投稿されました");
        this.$router.push("/posthome");
      })
    }
  }

}
</script>
