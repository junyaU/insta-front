<template>
  <div class="box">
    <input type="text" class="comment-input" placeholder="コメントを追加...">
    <input type="submit" class="comment-submit" value="投稿する" @click="Comment">
  </div>
</template>

<script>
export default {
  props: {
    postid: Number,
    userid: Number
  },
  methods:{
    async Comment(e){
      const apiUrl = "/api/auth/comment";
      const postId = this.postid;
      const userId = this.userid;
      const targetDom = e.target
      const commentText = targetDom.previousElementSibling.value;
      const formData = new FormData();

      if(!commentText){
        alert('１文字以上入力してください。');
        return;
      }

      formData.append("postId", postId);
      formData.append("userId", userId);
      formData.append("text", commentText);

      const commentData = await this.$axios.post(apiUrl, formData);
      if (commentData.status == 200){
        this.$router.push(`mypage/${userId}`);
      }
    }
  }

}
</script>

<style scoped>
  .box{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 2% 1%;
  }

  .comment-input{
    padding: 5px;
    border-radius: 5px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 90%;
    border: none;
  }

  .comment-input:focus{
    outline: 0;
    box-shadow: none;
  }

  .comment-submit{
    background: none;
    color: #4285f4;
    font-weight: bold;
    padding: 2px;
    border-radius: 3px;
    border: none;
  }
  @media screen and (min-width:320px) and (max-width:414px) {
    .comment-input{
      width: 90%;
      margin-bottom: 0;
    }

    .comment-submit{
      font-size: 10px;
    }
  }
</style>