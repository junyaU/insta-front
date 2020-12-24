<template>
<div class="all-wrapper">
  <AppHeader></AppHeader>
  <div class="post-container">
    <client-only>
      <h1>Post List</h1>
      <div class="post-wrapper">
        <div class="post-content" v-for="(data, index) in datas" :key="index">
          <div class="post-head">
            <div class="post-user-image-wrapper">
              <img class="post-user-image" v-lazy="data.User.Imageprofile.Image" v-if="data.User.Imageprofile">
              <img class="post-user-image" src="~/assets/image/noimage.png" v-else>
            </div>
            <h4 class="post-user-name">
              <nuxt-link :to="{name: 'mypage-id', params: {id: data.User.Id}}">
                {{data.User.Name}}
              </nuxt-link>
            </h4>
            <p class="post-delete-button" :data-id="data.Id" @click="deletePost" v-if="sessionUserId == data.User.Id">•••</p>
          </div>
          <div class="post-image-wrapper">
            <img v-lazy="data.Image" class="post-image-photo">
          </div>
          <div class="post-button-area">
            <div class="post-button">
              <img class="favo-button buttons" src="~assets/image/favorite_button.png" @click="favorite" :data-id="data.Id" data-favorited="0" v-if="!data.Favorite.map(user=>user.Id).includes(sessionUserId)">
              <img class="favo-button buttons" src="~assets/image/favorited_button.png" @click="favorite" :data-id="data.Id" data-favorited="1" v-else>
            </div>
          </div>
          <nuxt-link :to="{name: 'favorite-id', params: {id: data.Id}}">
            <p class="favorite-user-list"><span class="favorite-number">{{data.Favonum}}人</span>が「いいね！」しました</p>
          </nuxt-link>
          <div class="post-comment-wrapper">
            <p>{{data.Comment}}</p>
          </div>
          <CommentModal :comments="data.Comments" :user="data.User.Name" :image="data.User.Imageprofile"></CommentModal>
          <CommentArea class="comment-area" :postid=data.Id :userid=sessionUserId v-if="sessionUserId"></CommentArea>
        </div>
      </div>
    </client-only>
  </div>
</div>
</template>

<script>
export default {
  async asyncData({app}) {
    const datas = await app.$axios.$get(`/api/getpost`);

    return {datas}
  },
  computed:{
    sessionUserId(){
      const sessionExist = this.$store.state.session.data[0];
      const data = sessionExist ? this.$store.state.session.data[0].Id : 0;
      return data;
    }
  },

  methods: {
    favorite(e){
      let apiUrl;
      const postId = e.currentTarget.getAttribute("data-id");
      let favorited = e.currentTarget.getAttribute("data-favorited");
      const userId = this.sessionUserId
      const formData = new FormData();
      const targetPost = this.datas.filter(data => data.Id == postId);

      if(!userId){
        alert("「いいね！」を押すにはログインする必要があります。")
        return;
      }

      if(favorited == true){
        //いいねを外す
        apiUrl = "/api/auth/unfavorite";

        e.currentTarget.dataset.favorited = 0;
        targetPost[0].Favonum -= 1;
        e.currentTarget.src = require('~/assets/image/favorite_button.png');
      }else{
        //いいねをつける
        apiUrl = "/api/auth/favorite";

        e.currentTarget.dataset.favorited = 1;
        targetPost[0].Favonum +=  1;
        e.currentTarget.src =require('~/assets/image/favorited_button.png');
      }

      formData.append("postid", postId);
      formData.append("userid", userId);
      this.$axios.post(apiUrl, formData);
    },

    deletePost(e){
      const postId = e.currentTarget.getAttribute("data-id");
      const deleteUrl = `/api/auth/deletepost/${postId}`;
      const alertMessage = confirm("この投稿を削除します。よろしいですか？");
      if(alertMessage){
        e.currentTarget.parentNode.remove();
        this.$axios.get(deleteUrl);
      }
    },
  }
}
</script>

<style scoped>
.post-container {
  width: 43%;
  height: 100vh;
  min-height: 100%;
  text-align: center;
  margin: 0 auto;
  padding-top: 5%;
  background-color: #fafafa;
}
  .post-content{
    margin: 15px 0;
    background-color: #ffffff;
    border: 1px solid #dcdcdc;
    position: relative;
  }

  .post-wrapper{
    width: 100%;
    margin: 10px auto;
  }

  .post-head{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 2% 0;
  }

  .post-user-name{
    font-size: 1rem;
  }

  .post-user-image-wrapper{
    position: relative;
    height: auto;
    border-radius: 50%;
    width:10%;
    max-width: 10%;
    border: 1px solid #dcdcdc;
    margin: 0 2%;
  }

  .post-user-image-wrapper::before{
    padding-top: 100%;
    content: "";
    display: block;
  }

  .post-user-image{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .post-image-wrapper{
    width: 100%;
    max-width: 100%;
    height: auto;
    position: relative;
  }

  .post-image-wrapper::before{
    content: "";
    display: block;
    padding-top: 100%;
  }

  .post-image-photo{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    object-fit: cover;
    width: 100%;
    height:100%;
  }

  .post-button-area{
    display: flex;
  }

  .post-button{
    margin-left: 3%;
  }

  .favorite-user-list{
    text-align: left;
    margin: 2% 0;
    margin-left: 3%;
  }


  .favorite-number{
    font-weight: bold;
  }

  .post-comment-wrapper{
    text-align: left;
    margin-left: 3%;
    margin-bottom: 2%;
  }

  .favo-button{
    cursor: pointer;
    user-select: none;
  }

  a{
    color: inherit;
    text-decoration: none;
  }

  .image-photo{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .post-delete-button{
    position: absolute;
    right: 5%;
    bottom: 35%;
    cursor: pointer;
  }

  .comment-area{
    border-top: 1px solid #dcdcdc;
  }

    @media screen and (min-width:320px) and (max-width:414px) {
      .post-container{
      padding-top: 18%;
      width: 100%;
    }

    .favorite-user-list{
      font-size: 10px;
    }

    .post-comment-wrapper p{
      font-size: 8px;
    }

    .post-delete-button{
      font-size: 12px;
    }

    .buttons {
      width: 20px;
    }
}
</style>