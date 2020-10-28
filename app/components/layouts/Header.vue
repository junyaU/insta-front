<template>
  <header>
      <div class="header-parts">
        <nuxt-link to="/posthome">
          <p>Home</p>
        </nuxt-link>
      </div>
      <div class="header-parts">
        <nuxt-link to="/">
          <p>Login</p>
        </nuxt-link>
      </div>
      <div class="header-parts">
        <nuxt-link to="/postform">
          <p>Post</p>
        </nuxt-link>
      </div>
  </header>
</template>

<script>
export default {
}
</script>

<style scoped>
  header{
    color: #ffffff;
    background: #4285f4;
    width: 100%;
    height: 7%;
    position: fixed;
    font-size: 30px;
    top: 0%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .header-parts{
    cursor: pointer;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
</style>