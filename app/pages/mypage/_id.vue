<template>
  <div class="container">
    <client-only placeholder="Loading…">
      <AppHeader :session="sessionData"></AppHeader>
      <div class="profile-area">
        <div class="upper-wrapper">
          <div class="photo-image">
            <img v-if="imageData" :src="imageData"  class="image-data">
            <img class="image-data" src="~/assets/image/noimage.png" v-else>
          </div>
          <nuxt-link :to="{name: 'image-id', params: {id: data.Id}}" v-if="data.Id == sessionData.Id">
            <p>プロフィール画像を設定</p>
          </nuxt-link>
        </div>
        <div class="upper-wrapper">
          <div>
            <h2>{{data.Name}}</h2>
          </div>
        </div>
        <div class="upper-wrapper">
          <div>
            <h5>いいね合計数</h5>
            <h2>{{data.TotalFavorited}}</h2>
          </div>
        </div>
      </div>
      <div class="post-area">
        <div class="post-wrapper" v-for="(post, index) in data.Posts" :key="index">
          <nuxt-link :to="{name: 'postdetail-id', params:{id: post.Id}}">
            <img :src="imageHeader + post.Image" class="post-image">
          </nuxt-link>
        </div>
      </div>
    </client-only>
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
    const imageHeader = 'data:image/jpg;base64,'

    //画像データがあれば読み込む
    if(profileImageData.image){
      imageData = imageHeader + profileImageData.image;
    }
    return {data, imageData, sessionData, imageHeader}
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

  .photo-image{
    border: 1px solid #000000;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  .post-area{
    display: flex;
    flex-wrap: wrap;
  }

  .upper-wrapper{
    position: relative;
    height: 200px;
    width: 200px;
  }

  .upper-wrapper h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .post-wrapper{
    border: 1px solid #cccc;
    margin: 0 ;
    width: 33.3%;
    height:400px;
  }

  .image-data{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .post-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (min-width:320px) and (max-width:414px){
    .upper-wrapper{
      width: 110px;
      height: 110px;
    }

    .post-wrapper{
      height: 130px;
    }

    .upper-wrapper h2 {
      font-size: 15px;
    }
}
</style>