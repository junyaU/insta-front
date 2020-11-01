<template>
  <div class="container">
    <AppHeader></AppHeader>
    <h1>Post List</h1>
    <div class="post-wrapper">
      <div class="post-content" v-for="(data, index) in datas" :key="index">
        <h2 class="user-name">{{data.User.Name}}</h2>
        <div class="image-wrapper">
          <h1>ここに画像がきます</h1>
        </div>
        <div class="comment-wrapper">
          <p>{{data.Comment}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({app}) {
    const datas = await app.$axios.$get(`/api/getpost`);
    console.log(datas)
    return {datas}
  },

}
</script>

<style>
  .post-content{
    border: 2px solid black;
    margin: 15px 0
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
    width: 500px;
    margin: 0 auto;
  }

  .comment-wrapper{
    width: 60%;
    padding: 15px;
  }
</style>