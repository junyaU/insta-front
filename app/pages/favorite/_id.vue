<template>
<div class="all-wrapper">
  <AppHeader></AppHeader>
  <div class="container">
    <h1 class="favorite-header-text">いいねしたユーザー</h1>
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
</div>
</template>

<script>
export default {
  async asyncData({app, params}){
    const favoriteUsers = await app.$axios.$get(`/api/getfavoriteuser/`+ params.id);
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
      favoriteUsers.Favorite[i].Imageprofile.Image = imageDatas[i].image
    }

    return {favoriteUsers}
  },
}
</script>

<style scoped>
  .user-wrapper{
    width: 50%;
    margin: 0 auto;
  }

  .user-content{
    display: flex;
    align-items: center;
    margin: 10px 5px;
  }

  .image-wrapper{
    width: 20%;
    max-width: 20%;
    height: auto;
    position: relative;
    border: 1px solid  #cccc;
    border-radius: 50%;
  }

  .image-wrapper::before{
    content: "";
    display: block;
    padding-top: 100%;
  }

  .image-wrapper img {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
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

    .favorite-header-text{
      font-size: 22px;
    }

    .user-name{
      font-size: 18px;
    }

  }
</style>