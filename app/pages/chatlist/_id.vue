<template>
<div class="all-wrapper">
  <AppHeader></AppHeader>
  <div class="container">
    <div class="chat-page-user-wrapper">
      <h2>{{userData.data.Name}}のトーク</h2>
    </div>
    <div class="talk-list-wrapper">
      <div class="talk-list-content" v-for="(data, index) in chatData.data" :key="index">
        <div class="talk-user-image-wrapper">
          <img  class="talk-user-image" v-lazy="'data:image/jpg;base64,'+data.User.Imageprofile.Image" v-if="data.User.Imageprofile">
          <img class="talk-user-image" src="~/assets/image/noimage.png" v-else>
        </div>
        <div class="talk-user-text">
          <nuxt-link :to="{name: 'chat-id', params: {id: data.User.Id}}">
            <p class="talk-user-name">{{data.User.Name}}</p>
            <p class="talk-user-message">{{data.LatestMessage}}</p>
          </nuxt-link>
        </div>
        <p class="chat-time-text">{{data.time}}</p>
      </div>
      <h2 class="non-chat-text" v-if="!chatData.data">トーク履歴がありません</h2>
    </div>
  </div>
</div>
</template>

<script>
export default {
  middleware: 'logincheck',
  async asyncData({app, params}){
    const paramId = params.id;
    const [userData, chatData] = await Promise.all([
      app.$axios.get(`/api/user/${paramId}`),
      app.$axios.get(`/api/auth/getchatlist/${paramId}`),
    ]);

  chatData.data.forEach(data => {
    //時間をフォーマット
    const timeData = data.time.replace(/[A-Z]/g, " ");
    const chatDate = new Date(timeData.replace(/-/g,"/"));
    const nowDate = new Date();
    const todayCheck = (`${chatDate.getMonth()+1}${chatDate.getDate()}`) == (`${nowDate.getMonth()+1}${nowDate.getDate()}`);

    //本日なら時刻を、それ以外なら日にちを返す
    if(todayCheck){
      data.time = `${chatDate.getHours()}:${('00'+chatDate.getMinutes()).slice(-2)}`;
    }else{
      data.time = `${chatDate.getMonth()+1}/${('00'+chatDate.getDate()).slice(-2)}`;
    }
  });

  return {userData, chatData}
  },

  computed:{
    sessionUserId(){
      const sessionExist = this.$store.state.session.data[0];
      const data = sessionExist ? this.$store.state.session.data[0].Id : 0;
      return data;
    }
  },
}
</script>

<style scoped>
  .chat-page-user-wrapper{
    text-align: left;
    border-bottom: 1px solid #dcdcdc;
  }

  .chat-page-user-wrapper h2{
    margin-left: 4%;
  }

  .talk-list-wrapper{
    position: relative;
  }

  .talk-list-content{
    display: flex;
    align-items: center;
    margin: 2% 0;
    padding: 0 7%;
    user-select: none;
    position: relative;
  }

  .talk-user-image-wrapper{
    position: relative;
    width: 15%;
    max-width: 15%;
    height: auto;
    border-radius: 50%;
  }

  .talk-user-image-wrapper::before{
    content: "";
    display: block;
    padding-top: 100%;
  }

  .talk-user-image{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
  }

  .talk-user-text{
    text-align: left;
    margin-left: 2%;
    font-size: 1.2rem;
  }

  .talk-user-name{
    font-weight: bold;
  }

  .talk-user-message{
    color: #8e8e8e;
  }

  .chat-time-text{
    position: absolute;
    right: 1%;
    top: 0;
    color: #8e8e8e;


  }

  .non-chat-text{
    margin-top: 5%;
  }

  @media screen and (min-width:320px) and (max-width:414px) {
    .chat-page-user-wrapper{
      font-size: 12px;
    }

    .talk-user-text{
      font-size: 8px;
    }

    .non-chat-text{
      font-size: 16px;
    }

    .chat-time-text{
      font-size: 10px;
    }
  }
</style>