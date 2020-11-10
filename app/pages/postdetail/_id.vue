<template>
  <div class="container">
    <AppHeader :session="sessionData"></AppHeader>
    <h1>いいねしたユーザー</h1>
    <div class="user-wrapper" v-if="favoriteUsers.Favorite[0]">
      <div v-for=" (user, index) in favoriteUsers.Favorite" :key="index">
        <nuxt-link :to="{name: 'mypage-id', params: {id: user.Id}}" class="user-content">
          <div class="image-wrapper">
            <img :src="user.Image"  v-if="user.Image">
            <p class="non-image" v-else>未設定</p>
          </div>
          <h1 class="user-name">{{user.Name}}</h1>
        </nuxt-link>
      </div>
    </div>
    <h2 class="non-favorite-text" v-else>いいねしたユーザーはいません</h2>
  </div>
</template>

<script>
export default {
  async asyncData({app, params}){
    const sessionData = await app.$axios.$get(`/api/getsession`)
    const favoriteUsers = await app.$axios.$get(`/api/getfavoriteuser/`+ params.id)
    const imageHeader = 'data:image/jpg;base64,'

    //ユーザーの画像取得後配列に入れる
    for(const user of favoriteUsers.Favorite){
      const imageData = await app.$axios.$get(`/api/getprofileimage/` + user.Id)
      if (imageData){
        user.Image = imageHeader + imageData.image
      }
    }

    return {sessionData, favoriteUsers}
  },
}
</script>

<style scoped>
  .user-wrapper{
    border: 1px solid #cccc;
    width: 40%;
    margin: 0 auto;
  }

  .user-content{
    display: flex;
    align-items: center;
    margin: 10px 5px;

  }

  .image-wrapper{
    width: 100px;
    height: 100px;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
  }

  .user-name{
    margin-left: 10px;
  }

  .non-image{
    border: 1px solid  #cccc;
    width: 100px;
    height: 100px;
  }

  a{
    color: inherit;
    text-decoration: none;
  }

  .non-favorite-text{
    margin-top: 40px;
  }
</style>