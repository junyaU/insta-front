<template>
  <section class="container">
    <AppHeader></AppHeader>
    <h1 class="title">Instagram</h1>
    <div>
      <form action="/api/signup" method="POST">
        <div>
          <label for="Name">名前</label>
          <input type="text" name="Name" required>
        </div>
        <div>
          <label for="Email">メールアドレス</label>
          <input type="email" name="Email" required>
        </div>
        <div>
          <label for="Password">パスワード</label>
          <input type="password" name="Password" required>
        </div>
        <input type="submit" value="登録">
      </form>
    </div>
  </section>
</template>

<script>

export default {
  async asyncData({app}){
    const data =  await app.$axios.$get(`/api/test`)
    console.log(data)
    return data
  },


}

</script>

<style>
.container {
  min-height: 100vh;;
  text-align: center;
  margin-top: 5%;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
