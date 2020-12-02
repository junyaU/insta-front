<template>
  <div class="container">
    <AppHeader></AppHeader>
      <div class="tab">
        <p class="menu-text" data-num="1" @click="selectMenu">プロフィールを編集<span class="selected-sign selected">◀︎</span></p>
        <p class="menu-text" data-num="2" @click="selectMenu">パスワードを変更<span class="selected-sign">◀︎</span></p>
        <p class="menu-text" data-num="3" @click="selectMenu">ログアウト<span class="selected-sign">◀︎</span></p>
      </div>
      <div class="edit-wrapper">
        <div class="profile-edit">
          <EditProfile></EditProfile>
        </div>
        <div class="password-edit">
          <ChangePassword></ChangePassword>
        </div>
        <div class="logout">
          <Logout></Logout>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  middleware: 'logincheck',
  computed:{
    sessionUserId(){
      const sessionExist = this.$store.state.session.data[0];
      const data = sessionExist ? this.$store.state.session.data[0].Id : 0;
      return data;
    }
  },
  async asyncData({app, params}) {
    let imageData = "";
    const imageHeader = 'data:image/jpg;base64,';
    const paramId = params.id;
    const [data, profileImageData] = await Promise.all([
      app.$axios.$get(`/api/user/${paramId}`),
      app.$axios.$get(`/api/getprofileimage/${paramId}`),
    ]);

    //画像データがあれば読み込む
    if(profileImageData.image){
      imageData = imageHeader + profileImageData.image;
    }
    return {data, imageData, imageHeader}
  },

  methods:{
    insertInput(){
      const nameDom = document.querySelector(".input-name");
      const emailDom = document.querySelector(".input-email");
      const imageDom = document.querySelector(".input-image");

      nameDom.value = this.data.Name;
      emailDom.value = this.data.Email;
    },

    selectMenu(e){
      const selectDom = e.target;
      const selectNumber = selectDom.getAttribute("data-num");
      const parentDom = document.querySelector(".tab");
      const profile = document.querySelector(".profile-edit");
      const password = document.querySelector(".password-edit");
      const logout = document.querySelector(".logout");
      const selectProfile = 1;
      const selectPassword = 2;
      const selectLogout = 3;

      Array.from(parentDom.children).forEach(child => {
        child.firstElementChild.style.display = "none"
      });
      selectDom.firstElementChild.style.display = "inline";

      if(selectNumber == selectProfile){
        //inputの値を下の値にリセットする
        this.insertInput()
        profile.style.display = "block";
        password.style.display = "none";
        logout.style.display = "none";
      }else if(selectNumber == selectPassword){
        profile.style.display = "none";
        password.style.display = "block";
        logout.style.display = "none";
      }else if(selectNumber == selectLogout){
        profile.style.display = "none";
        password.style.display = "none";
        logout.style.display = "block";
      }
    },
  },

  mounted(){
    this.insertInput();
  }
}
</script>

<style scoped>
  .tab{
    position: absolute;
    top: 20%;
    left: 5%;
    width: 20%;
    font-size: 15px;
    background-color: #fafafa;
    border-right: 1px solid #333;
  }

  .tab p{
    padding: 10px;

  }

  .edit-wrapper{
    width: 40%;
    margin: 0 auto;
  }

  .password-edit{
    display: none;
  }

  .logout{
    display: none;
  }

  .menu-text{
    position: relative;
    cursor: pointer;
    user-select: none;
  }

  .selected-sign{
    position: absolute;
    top: 30%;
    right: 5%;
    display: none;
  }

  .selected{
    display: inline;
  }

  .logout-text{
    margin-bottom: 20px;
  }


</style>