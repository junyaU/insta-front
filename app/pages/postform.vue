<template>
  <div class="container">
      <AppHeader></AppHeader>
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
  middleware: 'logincheck',
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

      const post = await this.$axios.post(apiUrl, formData);
      alert("正常に投稿されました");
      this.$router.push("/posthome");
    }
  },
}
</script>
