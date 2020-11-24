<template>
  <div class="container">
    <AppHeader :session="sessionData"></AppHeader>
    <h1>いいねしたユーザー</h1>
    <client-only placeholder="Loading…">
    <div class="user-wrapper" v-if="favoriteUsers.Favorite[0]">
      <div v-for=" (user, index) in favoriteUsers.Favorite" :key="index">
        <nuxt-link :to="{name: 'mypage-id', params: {id: user.Id}}" class="user-content">
          <div class="image-wrapper">
            <img :src="user.Image"  v-if="user.Image">
            <img src="~/assets/image/noimage.png" v-else>
          </div>
          <h1 class="user-name">{{user.Name}}</h1>
        </nuxt-link>
      </div>
    </div>
    <h2 class="non-favorite-text" v-else>いいねしたユーザーはいません</h2>
    </client-only>
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
    position: relative;
    border: 1px solid  #cccc;
    border-radius: 50%;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name{
    margin-left: 10px;
  }

  a{
    color: inherit;
    text-decoration: none;
  }

  .non-favorite-text{
    margin-top: 40px;
  }

  @media screen and (min-width:320px) and (max-width:414px){
    .user-wrapper{
      width: 70%;
    }

    .user-name{
      font-size: 15px;
    }

    .image-wrapper{
      width: 80px;
      height: 80px;
    }
  }
</style>