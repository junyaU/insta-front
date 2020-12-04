<template>
  <div class="container">
    <client-only>
      <AppHeader></AppHeader>
      <h1>Post List</h1>
      <div class="post-wrapper">
        <div class="post-content" v-for="(data, index) in datas" :key="index">
          <h2 class="user-name">
            <nuxt-link :to="{name: 'mypage-id', params: {id: data.User.Id}}">
              {{data.User.Name}}
            </nuxt-link>
          </h2>
          <a class="delete-button" :data-id="data.Id" @click="deletePost" v-if="sessionUserId == data.User.Id">削除</a>
          <div class="image-wrapper">
            <img v-lazy="'data:image/jpg;base64,' +  data.Image" class="image-photo">
          </div>
          <div class="comment-wrapper">
            <p>{{data.Comment}}</p>
          </div>
          <span class="favo-button" @click="favorite" :data-id="data.Id" data-favorited="0" v-if="!data.Favorite.map(user=>user.Id).includes(sessionUserId)">♡{{data.Favonum}}</span>
          <span class="favo-button favorited" @click="favorite" :data-id="data.Id" data-favorited="1" v-else>❤️{{data.Favonum}}</span>
          <nuxt-link :to="{name: 'postdetail-id', params: {id: data.Id}}">
            <p class="favorite-user-list">いいねしたユーザー</p>
          </nuxt-link>
        </div>
      </div>
    </client-only>
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
        return;
      }

      if(favorited == true){
        //いいねを外す
        apiUrl = "/api/unfavorite";

        e.currentTarget.dataset.favorited = 0;
        targetPost[0].Favonum -= 1;
        e.currentTarget.style.color = "black";
        e.currentTarget.innerHTML = `♡${targetPost[0].Favonum}`;
      }else{
        //いいねをつける
        apiUrl = "/api/favorite";

        e.currentTarget.dataset.favorited = 1;
        targetPost[0].Favonum +=  1;
        e.currentTarget.style.color = "red";
        e.currentTarget.innerHTML = `❤️${targetPost[0].Favonum}`;
      }

      formData.append("postid", postId);
      formData.append("userid", userId);
      this.$axios.post(apiUrl, formData);
    },

    deletePost(e){
      const postId = e.currentTarget.getAttribute("data-id");
      const deleteUrl = `/api/deletepost/${postId}`;
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
  .post-content{
    border: 2px solid #000000;
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
    width: 72%;
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
    bottom: 8%;
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

  .favorited{
    color: #ff0000;
  }

  .delete-button{
    position: absolute;
    top: 1%;
    right: 5%;
    font-size: 20px;
    background: #ff0000;
    color: #ffffff;
    padding: 5px;
    border-radius: 5px;
  }

  .favorite-user-list{
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 1%;
    font-weight: bold;
  }

    @media screen and (min-width:320px) and (max-width:414px) {
    .image-wrapper{
      height: 150px;
    }

    .post-wrapper{
      width: 60%;
    }

    .user-name{
      font-size: 15px;
    }

    .favo-button{
      font-size: 15px;
    }

    .favorite-user-list{
      font-size: 10px;
    }

    .comment-wrapper p{
      font-size: 8px;
    }

    .delete-button{
      font-size: 12px;
    }
}
</style>