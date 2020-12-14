<template>
  <div class="container">
    <AppHeader></AppHeader>
    <h1>いいねしたユーザー</h1>
    <client-only >
    <div class="user-wrapper" v-if="favoriteUsers.Favorite[0]">
      <div v-for=" (user, index) in favoriteUsers.Favorite" :key="index">
        <nuxt-link :to="{name: 'mypage-id', params: {id: user.Id}}" class="user-content">
          <div class="image-wrapper">
            <img v-lazy="user.Imageprofile.Image"  v-if="user.Imageprofile">
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
    const favoriteUsers = await app.$axios.$get(`/api/getfavoriteuser/`+ params.id)
    const imageHeader = 'data:image/jpg;base64,'
    const userIds = [];

    //ユーザーのIDを配列に入れる
    for(const user of favoriteUsers.Favorite){
      userIds.push(user.Id);
    }

    //並列処理
    const imageDatas = await Promise.all(userIds.map(async id =>{
      return await app.$axios.$get(`/api/getprofileimage/` + id);
    }));

    //ユーザーIDの配列と画像データが入っている配列は必然的に同じ要素数になる
    for(let i=0; i<imageDatas.length; i++){
      if(imageDatas[i])
      favoriteUsers.Favorite[i].Imageprofile.Image = imageHeader + imageDatas[i].image
    }

    return {favoriteUsers}
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