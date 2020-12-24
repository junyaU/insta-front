<template>
  <header>
    <client-only>
      <div class="header-parts">
        <nuxt-link to="/posthome">
          <img src="~/assets/image/homeicon.png" class="icon">
        </nuxt-link>
      </div>
      <div class="header-parts">
        <div class="header-img-wrapper">
          <nuxt-link to="/" v-if="!this.$store.state.session.data[0]">
            <img  src="~/assets/image/loginicon.png" class="icon no-login-icon">
          </nuxt-link>
          <nuxt-link :to="{name: 'mypage-id', params: {id: sessionUserId}}" v-else>
            <img v-lazy="imgData.image" class="icon user-icon" v-if="imgData.image">
            <img src="~/assets/image/noimage.png" class="icon user-icon" v-else>
          </nuxt-link>
        </div>
      </div>
      <div class="header-parts">
        <nuxt-link to="/postform">
          <img src="~/assets/image/posticon.png" class="icon">
        </nuxt-link>
      </div>
      <div class="header-parts">
        <nuxt-link :to="{name :'chatlist-id', params:{id: sessionUserId}}">
          <img src="~/assets/image/chat_icon.png" class="icon">
        </nuxt-link>
      </div>
      <div class="header-parts">
        <nuxt-link :to="{name: 'config-id', params:{id: sessionUserId}}">
          <img src="~/assets/image/configicon.png" class="icon">
        </nuxt-link>
      </div>
    </client-only>
  </header>
</template>

<script>
export default {
  data(){
    return {imgData:[]}
  },
  computed:{
    sessionUserId(){
      const sessionExist = this.$store.state.session.data[0];
      const data = sessionExist ? this.$store.state.session.data[0].Id : 0;
      return data;
    }
  },
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
    },

    async getImage(){
      const profileImagedata = await this.$axios.get(`/api/getprofileimage/${this.sessionUserId}`);
      this.imgData = profileImagedata.data
    },
  },
  created(){
    this.session();
    this.getImage();
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
    top: 0%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 100;
  }

  .header-parts{
    cursor: pointer;
    width: 8%;
  }

  .no-login-icon{
    border-radius: 0 !important;
  }

  .header-img-wrapper{
    cursor: pointer;
    position: relative;
    border-radius: 50%;
    width:100%;
    max-width:100%;
    height: auto;
  }

  .header-img-wrapper:before{
    content: "";
    display: block;
    padding-top: 100%;
  }

  .header-img-wrapper img{
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

  a{
    text-decoration: none;
    color: inherit;
  }

  .icon{
    width: 100%;

  }

  @media screen and (min-width:600px){
    .icon{
      max-width: 45px;
    }

    .header-img-wrapper{
      max-width:45px;
    }
  }



</style>