<template>
  <header>
    <client-only>
      <div class="header-parts">
        <nuxt-link to="/posthome">
          <p>Home</p>
        </nuxt-link>
      </div>
      <div class="header-parts">
        <nuxt-link to="/" v-if="!this.$store.state.session.data[0]">
          <p>login</p>
        </nuxt-link>
        <p @click="logout" v-else>Logout</p>
      </div>
      <div class="header-parts">
        <nuxt-link to="/postform">
          <p>Post</p>
        </nuxt-link>
      </div>
    </client-only>
  </header>
</template>

<script>
export default {
  methods:{
    async logout(){
      const apiUrl = "/api/logout";
      const logout = await this.$axios.get(apiUrl);
      this.$store.commit("session/delete");
      this.$router.push("/");
    },
    async session(){
      const sessionData = await this.$axios.get("/api/getsession");
      if(!sessionData.data){
        this.$store.commit("session/delete");
      }
    }
  },
  created(){
    this.session()
  }
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