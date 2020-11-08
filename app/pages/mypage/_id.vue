<template>
  <div class="container">
    <AppHeader></AppHeader>
    <div class="profile-area">
      <div class="photo-wrapper">
        <div id="photo-image">
          <img v-if="imageData" :src="imageData"  class="image-data">
          <p v-else>画像未設定</p>
        </div>
        <nuxt-link :to="{name: 'image-id', params: {id: data.Id}}" v-if="data.Id == sessionData.userid">
          <p>プロフィール画像を設定</p>
        </nuxt-link>
      </div>
      <div class="name-wrapper">
        <h2>{{data.Name}}</h2>
      </div>
      <div class="good-wrapper">
        <h5>いいね合計数</h5>
        <h2>{{data.TotalFavorited}}</h2>
      </div>
    </div>
    <div class="post-area">
      <div class="post-wrapper" v-for="(post, index) in data.Posts" :key="index">
        <h3>{{post.Comment}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({app, params}){
    const paramId = params.id
    const data = await app.$axios.$get(`/api/user/${paramId}`)
    const profileImageData = await app.$axios.$get(`/api/getprofileimage/${paramId}`)
    const sessionData = await app.$axios.$get(`/api/getsession`)
    let imageData = ""

    //画像データがあれば読み込む
    if(profileImageData.image){
      imageData = 'data:image/jpg;base64,' + profileImageData.image;
    }
    return {data, imageData,sessionData}
  }
}
</script>

<style scoped>
  .profile-area{
    border-bottom: 1px solid #cccc;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
  }

  #photo-image{
    border: 1px solid black;
    height: 200px;
    width: 200px;
  }

  .post-area{
    display: flex;
    flex-wrap: wrap;
  }

  .post-wrapper{
    border: 1px solid #cccc;
    margin: 0 ;
    width: 480px ;
    height:400px;
  }

  .image-data{
    width: 100%;
    height: 100%;
  }
</style>