<template>
  <div class="container">
    <AppHeader></AppHeader>
    <h1>Post List</h1>
    <div class="post-wrapper">
      <div class="post-content" v-for="(data, index) in datas" :key="index">
        <h2 class="user-name">
          <nuxt-link :to="{name: 'mypage-id', params: {id: data.User.Id}}">
            {{data.User.Name}}
          </nuxt-link>
        </h2>
        <div class="image-wrapper">
          <img :src="imageHeader + data.Image" class="image-photo">
        </div>
        <div class="comment-wrapper">
          <p>{{data.Comment}}</p>
        </div>
        <span class="favo-button" @click="favorite(data.Id)">♡{{data.Favonum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({app}) {
    const datas = await app.$axios.$get(`/api/getpost`);
    const imageHeader = 'data:image/jpg;base64,'
    return {datas, imageHeader}
  },

  methods: {
    favorite(id){
      const favoriteUrl = "/api/favorite";
      const formData = new FormData();

      formData.append('postid', id);
      this.$axios.post(favoriteUrl, formData)
    }
  }

}
</script>

<style scoped>
  .post-content{
    border: 2px solid black;
    margin: 15px 0;
    position: relative;
  }

  .post-wrapper{
    width: 50%;
    margin: 10px auto;
  }

  .user-name{
    text-align: left;
    margin-left: 30px;
    margin-bottom: 20px;
  }

  .image-wrapper{
    border: 1px solid #aaaa;
    height: 300px;
    width: 500px;
    margin: 0 auto;
  }

  .comment-wrapper{
    width: 60%;
    padding: 15px;
  }

  .favo-button{
    position: absolute;
    font-size: 30px;
    right: 3%;
    bottom: 2%;
    cursor: pointer;
  }

  a{
    color: inherit;
  }

  .image-photo{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>