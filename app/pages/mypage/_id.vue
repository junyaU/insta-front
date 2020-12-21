<template>
<div class="all-wrapper">
  <AppHeader></AppHeader>
  <div class="container">
    <cliant-only>
      <div class="profile-area">
        <div class="profile-photo-wrapper">
          <div class="photo-image">
            <img v-if="imageData" v-lazy="imageData"  class="image-data">
            <img class="image-data" src="~/assets/image/noimage.png" v-else>
          </div>
          <nuxt-link :to="{name: 'image-id', params: {id: data.Id}}" v-if="data.Id == sessionUserId">
            <p class="setting-image">画像を設定</p>
          </nuxt-link>
        </div>
        <div class="profile-text-wrapper">
          <div class="user-info">
            <h2 class="profile-user-name">{{data.Name}}</h2>
            <div class="follow-area" v-if="sessionUserId && sessionUserId != data.Id">
              <p class="un-follow" @click="follow" data-id="0"  v-if="!alreadyFollow">フォローする</p>
              <p class="follow" @click="follow" data-id="1" v-else>フォロー中</p>
            </div>
            <div class="profile-message-area" v-if="sessionUserId && sessionUserId != data.Id">
              <nuxt-link :to="{name: 'chat-id', params:{id: data.Id}}">
                <p class="profile-message-button"  v-show="alreadyFollow">メッセージを送信</p>
              </nuxt-link>
            </div>
          </div>
          <div class="number-info">
            <div>
              <p>投稿</p>
              <p><span class="number-wrapper">{{postNumber}}</span>件</p>
            </div>
            <div>
              <nuxt-link :to="{name: 'follow-id', params: {id: data.Id}}">
                <p class="follow-text">フォロー中</p>
                <p><span class="number-wrapper">{{followeeNumber}}</span>人</p>
              </nuxt-link>
            </div>
            <div>
              <nuxt-link :to="{name: 'follow-id', params: {id: data.Id}}">
                <p class="follow-text">フォロワー</p>
                <p><span class="number-wrapper">{{followerNumber}}</span>人</p>
              </nuxt-link>
            </div>
            <div>
              <p>いいね合計数</p>
              <p><span class="number-wrapper">{{data.TotalFavorited}}</span>個</p>
            </div>
          </div>
        </div>
      </div>
      <div class="post-area">
        <div class="post-wrapper" v-for="(post, index) in data.Posts" :key="index">
          <nuxt-link :to="{name: 'postdetail-id', params:{id: post.Id}}">
            <img v-lazy="imageHeader + post.Image" class="post-image">
          </nuxt-link>
        </div>
      </div>
    </cliant-only>
  </div>
</div>
</template>

<script>
export default {
  async asyncData({app, params}){
    const paramId = params.id;
    const [data, profileImageData, followData] = await Promise.all([
      app.$axios.$get(`/api/user/${paramId}`),
      app.$axios.$get(`/api/getprofileimage/${paramId}`),
      app.$axios.$get(`/api/followUser/${paramId}`)
    ])

    let imageData = "";
    const imageHeader = 'data:image/jpg;base64,';
    //画像データがあれば読み込む
    if(profileImageData.image){
      imageData = imageHeader + profileImageData.image;
    }

    const followers =followData.Follower
    const followeeNumber = (followData.Followee) ? followData.Followee.length : 0;
    const followerNumber = (followData.Follower) ? followData.Follower.length : 0;
    const postNumber = (data.Posts) ? data.Posts.length : 0;

    return {data, imageData, imageHeader, postNumber, followerNumber, followeeNumber, followers}
  },

  computed:{
    sessionUserId(){
      const sessionExist = this.$store.state.session.data[0];
      const data = sessionExist ? this.$store.state.session.data[0].Id : 0;
      return data;
    },
    //フォローしているかチェック
    alreadyFollow(){
      const followers = this.followers;
      const myId = this.sessionUserId;
      let followersId;
      if(!followers){
        return
      }

      followersId = followers.map(follower =>{
        return follower.Id
      })

      if(followersId.includes(myId)){
        return true
      }
    }
  },

  methods: {
    async follow(e){
      const meId = this.sessionUserId;
      const toId = this.data.Id;
      const followUrl = "/api/auth/follow";
      const unFollowUrl = "/api/auth/unfollow";
      const formData = new FormData();
      const unFollowDom = document.querySelector(".un-follow");
      const followDom = document.querySelector(".follow");
      const alreadyFollow = e.target.getAttribute("data-id");
      const profileMessageButton = document.querySelector(".profile-message-button");

      if(!meId){
        return
      }

      if(alreadyFollow == 0){
        formData.append("meId", meId);
        formData.append("toId", toId);

        const followData = await this.$axios.post(followUrl, formData);
        if(followData.status == 200){
          profileMessageButton.style.display = "inline";
          e.target.style.background = "#ffffff";
          e.target.style.color = "#4385f4";
          e.target.innerHTML = "フォロー中";
          e.target.dataset.id = 1;
          this.followerNumber += 1

        }else{
          alert("フォローに失敗しました");
        }
      }else{
        formData.append("meId", meId);
        formData.append("toId", toId);

        const unFollowData = await this.$axios.post(unFollowUrl, formData);
        if(unFollowData.status == 200){
          profileMessageButton.style.display = "none";
          e.target.style.background = "#4385f4";
          e.target.style.color = "#ffffff";
          e.target.innerHTML = "フォローする";
          e.target.dataset.id = 0;
          this.followerNumber -= 1
        }else{
          alert("フォロー解除に失敗しました");
        }
      }
    },
  }
}
</script>

<style scoped>

  .profile-area{
    border-bottom: 1px solid #cccc;
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 1% ;
    position: relative;
  }

  .setting-image{
    font-size: 0.5rem;
  }

  .profile-photo-wrapper{
    width: 20%;
    height: auto;
  }

  .photo-image{
    position: relative;
    border: 1px solid #000000;
    border-radius: 50%;
    width:100%;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }

  .photo-image:before{
  content: "";
  display: block;
  padding-top: 100%;
}

  .image-data{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-info{
    display: flex;
    align-items: center;
  }

  .profile-user-name{
    font-size: 1.4rem;
    text-align: left;
    margin-left: 6%;
    margin-right: 2%;
  }

  .profile-text-wrapper{
    width: 100%;
  }

  .number-info{
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
  }

  .number-wrapper{
    font-weight: bold;
  }

  .follow{
    background-color: #ffffff;
    color: #4285f4;
    padding: 2px;
    border-radius: 5px;
    border: 1px solid #4385f4;
  }

  .un-follow{
    background-color: #4285f4;
    color: #ffffff;
    font-size: 1rem;
    padding: 2px;
    border-radius:5px;
    border: 1px solid #4385f4;
  }

  .profile-message-area{
    margin-left: 1%;
  }

  .profile-message-button{
    border: 1px solid #dcdcdc;
    padding: 2px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 1rem;
  }

  .post-area{
    display: flex;
    flex-wrap: wrap;
    background-color: #fafafa;
  }

  .post-wrapper{
    position: relative;
    overflow: hidden;
    width:33.3%;
    padding-top: 33.3%
  }

  .post-image{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (min-width:320px) and (max-width:414px) {
    .number-info{
      font-size: 6px;
    }

    .un-follow{
      font-size: 5px;
    }

    .follow{
      font-size: 5px;
    }

    .profile-message-button{
      font-size: 5px;
    }
  }

</style>