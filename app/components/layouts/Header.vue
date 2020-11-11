<template>
  <header>
      <div class="header-parts">
        <nuxt-link to="/posthome">
          <p>Home</p>
        </nuxt-link>
      </div>
      <div class="header-parts">
        <nuxt-link to="/" v-if="!session">
          <p>login</p>
        </nuxt-link>
        <a href="/api/logout" v-else>Logout</a>
      </div>
      <div class="header-parts">
        <nuxt-link to="/postform" v-if="session">
          <p>Post</p>
        </nuxt-link>
        <nuxt-link to="/" v-else>
          <p>Post</p>
        </nuxt-link>
      </div>
  </header>
</template>

<script>
export default {
  props:["session"],
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
    z-index: 100;
  }

  .header-parts{
    cursor: pointer;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
</style>