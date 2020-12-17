<template>
<div class="all-wrapper">
  <AppHeader></AppHeader>
  <div class="container">
    <client-only>
      <h1>プロフィール画像設定</h1>
      <InputPhoto classname="image-input"></InputPhoto>
      <input class="userId" type="hidden" :value="$route.params.id">
      <SubmitButton @click.native="upload"></SubmitButton>
    </client-only>
  </div>
</div>
</template>

<script>
export default {
  methods:{
    async upload(){
      const apiUrl = "/api/auth/upload";
      const userId = document.querySelector(".userId").value;
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

      formData.append("userId", userId);
      formData.append("Image", image);

      const upload = await this.$axios.post(apiUrl, formData);
      if(upload.status == 200){
        this.$router.push("/posthome");
      }else{
        alert("画像の投稿に失敗しました。")
      }
    }
  }
}
</script>

<style>

</style>