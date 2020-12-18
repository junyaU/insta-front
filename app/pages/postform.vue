<template>
<div class="all-wrapper">
  <AppHeader></AppHeader>
  <div class="container">
    <client-only>
      <h1>Post Form</h1>
      <p>画像を選択してください</p>
      <InputPhoto classname="image-input"></InputPhoto>
      <TextArea classname="text-input"></TextArea>
      <SubmitButton @click.native="post"></SubmitButton>
    </client-only>
  </div>
</div>
</template>

<script>
export default {
  middleware: 'logincheck',
  computed:{
  sessionUserId(){
    const sessionExist = this.$store.state.session.data[0];
    const data = sessionExist ? this.$store.state.session.data[0].Id : 0;
    return data;
    }
  },

  methods: {
    async post(){
      const apiUrl = "/api/auth/post";
      const userId = this.sessionUserId;
      const textDom = document.querySelector(".text-input");
      const imageDom = document.querySelector(".image-input");
      const image = imageDom.files[0];
      const formData = new FormData();
      const imageCheck = ".png|.jpg|.jpeg|.gif";

      if(!userId){
        alert("ログインされていません");
        return
      }

      if(!image){
        alert("画像が選択されていません");
        return;
      }

      if(!image.name.match(imageCheck)){
        alert("jpg、png、gifファイルを選択してください");
        return
      }

      formData.append("UserId", userId);
      formData.append("Comment", textDom.value);
      formData.append("Image", image);

      const postData = await this.$axios.post(apiUrl, formData);
      if(postData.status == 200){
        this.$router.push("/posthome");
      }else{
        alert("投稿に失敗しました。");
      }
    }
  }
}
</script>
