<template>
<div class="all-wrapper">
  <AppHeader></AppHeader>
  <div class="container">
    <h1 class="user-top-text">{{followData.data.Username}}</h1>
    <div class="follow-info-toggle">
      <h1 class="followee-head" data-id="1" @click="toggleFollowInfo">フォロー</h1>
      <h1 class="follower-head" data-id="0" @click="toggleFollowInfo">フォロワー</h1>
    </div>
    <div class="follow-content followee-content">
      <div class="user-content" v-for="(followee, index) in followData.data.Followee" :key="index">
        <div class="img-wrapper">
          <img v-lazy="'data:image/jpg;base64,'+followee.Imageprofile.Image" v-if="followee.Imageprofile">
          <img src="~/assets/image/noimage.png" v-else>
        </div>
        <nuxt-link :to="{name: 'mypage-id', params:{id: followee.Id}}">
          <h1 class="user-name">{{followee.Name}}</h1>
        </nuxt-link>
      </div>
    </div>
    <div class="follow-content follower-content">
      <div class="user-content" v-for="(follower, index) in followData.data.Follower" :key="index">
        <div class="img-wrapper">
          <img v-lazy="'data:image/jpg;base64,'+follower.Imageprofile.Image" v-if="follower.Imageprofile">
          <img src="~/assets/image/noimage.png" v-else>
        </div>
        <nuxt-link :to="{name: 'mypage-id', params:{id: follower.Id}}">
          <h1 class="user-name">{{follower.Name}}</h1>
        </nuxt-link>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  async asyncData({app, params}){
    const paramId = params.id;
    const followData = await app.$axios.get(`/api/followUser/${paramId}`);

    return {followData}
  },
  methods:{
    toggleFollowInfo(e){
      const followInfo = e.target.getAttribute("data-id");
      const followeeContent = document.querySelector(".followee-content");
      const followerContent = document.querySelector(".follower-content");
      const followeeHead = document.querySelector(".followee-head");
      const followerHead = document.querySelector(".follower-head");

      if(followInfo == 1){
        //フォローしているユーザー
        followeeHead.style.background = "#4285f4";
        followeeHead.style.color= "#ffffff";
        followerHead.style.background = "LightGray";
        followerHead.style.color= "#ffffff";

        followeeContent.style.display = "block";
        followerContent.style.display = "none";


      }else{
        //フォロワー
        followeeHead.style.background = "LightGray";
        followeeHead.style.color= "#ffffff";
        followerHead.style.background = "#4285f4";
        followerHead.style.color= "#ffffff";

        followeeContent.style.display = "none";
        followerContent.style.display = "block";
      }
    }
  }
}
</script>

<style >
  .user-top-text{
    margin-bottom: 2%;
  }

  .follow-info-toggle{
    display: flex;
    width: 35%;
    margin: 0 auto;
    justify-content: space-around;
    border-bottom: none;
  }

  .followee-head{
    background-color: #4285f4;
    color: #ffffff;
    border-radius: 3px 3px 0 0;
    text-shadow: 0 -1px 0 rgba(0,0,0,.2);
    width: 45%;
    user-select: none;
  }

  .follower-head{
    color: White;
    background: LightGray;
    border-radius: 3px 3px 0 0;
    font-weight: bold;
    text-shadow: 0 -1px 0 rgba(0,0,0,.2);
    width:45%;
    user-select: none;
  }

  .follow-content{
    width: 45%;
    border-radius: 3px;
    border: 1px solid #4285f4;
    border-top: 4px solid #4285f4;
    margin: 0 auto;
  }

  .user-content{
    display: flex;
    align-items: center;
    margin: 10px 5px;

  }

  .img-wrapper{
    width: 100px;
    height: 100px;
    position: relative;
    border: 1px solid  #cccc;
    border-radius: 50%;
  }

  .img-wrapper img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name{
    margin-left: 10px;
  }

  .follower-content{
    display: none;
  }


</style>