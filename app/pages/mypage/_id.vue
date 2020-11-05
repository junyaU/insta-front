<template>
  <div class="container">
    <AppHeader></AppHeader>
    <div class="profile-area">
      <div class="photo-wrapper">
      </div>
      <div class="name-wrapper">
        <h2>{{data.Name}}</h2>
      </div>
      <div class="good-wrapper">
        <h5>いいね合計数</h5>
        <h2>{{data.TotalFavorited}}</h2>
      </div>
    </div>
    <div class="post-area">
      <div class="post-wrapper" v-for="(post, index) in data.Posts" :key="index">
        <h3>{{post.Comment}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({app, params}){
    const paramId = params.id
    const data = await app.$axios.$get(`/api/user/${paramId}`)
    console.log(data)
    return {data}
  }
}
</script>

<style scoped>
  .profile-area{
    border-bottom: 1px solid #cccc;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
  }
  .photo-wrapper{
    border: 1px solid black;
    height: 200px;
    width: 200px;
  }

  .post-area{
    display: flex;
    flex-wrap: wrap;
  }

  .post-wrapper{
    border: 1px solid #cccc;
    margin: 0 ;
    width: 480px ;
    height:400px;
  }
</style>