<template>
  <div class="container">
    <client-only placeholder="Loading…">
      <AppHeader :session="sessionData"></AppHeader>
      <h1>Post List</h1>
      <div class="post-wrapper">
        <div class="post-content" v-for="(data, index) in datas" :key="index">
          <h2 class="user-name">
            <nuxt-link :to="{name: 'mypage-id', params: {id: data.User.Id}}">
              {{data.User.Name}}
            </nuxt-link>
          </h2>
          <a class="delete-button" :data-id="data.Id" @click="deletePost" v-if="sessionData.Id == data.User.Id">削除</a>
          <div class="image-wrapper">
            <img :src="imageHeader + data.Image" class="image-photo">
          </div>
          <div class="comment-wrapper">
            <p>{{data.Comment}}</p>
          </div>
          <span class="favo-button" @click="favorite" :data-id="data.Id" data-favorited="0" v-if="!data.Favorite.map(user=>user.Id).includes(sessionData.Id)">♡{{data.Favonum}}</span>
          <span v-else class="favo-button favorited">❤️{{data.Favonum}}</span>
          <a class="favorite-user-list" :href="'/postdetail/'+data.Id">いいねしたユーザー</a>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  async asyncData({app}) {
    const datas = await app.$axios.$get(`/api/getpost`);
    const imageHeader = 'data:image/jpg;base64,'
    const sessionData = await app.$axios.$get(`/api/getsession`);
    return {datas, imageHeader, sessionData}
  },

  methods: {
    favorite(e){
      const favoriteUrl = `/api/favorite`;
      const postId = e.currentTarget.getAttribute("data-id");
      let favorited = e.currentTarget.getAttribute("data-favorited");
      const userId = this.sessionData.Id;
      const formData = new FormData();
      if(favorited == true || !this.sessionData){
        return
      }
      e.currentTarget.dataset.favorited = 1;

      //対象のPOSTを絞り込み
      const targetPost = this.datas.filter(data => data.Id == postId);

      //いいねしたユーザーのIDを配列に入れる
      const favoriteIds = targetPost[0].Favorite.map(user => user.Id);
      //いいねを押した後、文字色や値を切り替え
      targetPost[0].Favonum +=  1;
      e.currentTarget.style.color = "red";
      e.currentTarget.innerHTML = `❤️${targetPost[0].Favonum}`;

      formData.append('postid', postId);
      this.$axios.post(favoriteUrl, formData);
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
}
</style>