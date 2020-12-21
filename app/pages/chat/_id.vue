<template>
<div class="all-wrapper">
  <AppHeader></AppHeader>
  <div class="container">
    <div class="talk-wrapper">
      <div class="talk-header">
        <div class="talk-head-img-wrapper">
          <img class="talk-head-img" v-lazy="imageData" v-if="imageData">
          <img class="talk-head-img" src="~/assets/image/noimage.png" v-else>
        </div>
        <p>{{datas.Name}}</p>
      </div>
      <div class="talk-content">
        <div class="message-content" v-for="(data,index) in chatData" :key="index">
          <p class="from-message" v-if="data.From.Id == sessionUserId">{{data.Text}}</p>
          <p class="to-message" v-else>{{data.Text}}</p>
        </div>
      </div>
        <div class="talk-input-area">
          <div class="chat-input">
            <input class="chat-input-text" type="text">
            <input class="chat-submit-button" type="submit" value="送信" @click="send">
          </div>
        </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  async asyncData({app, params}){
    const paramId = params.id
    const [data, profileImageData, chatDatas] = await Promise.all([
      app.$axios.get(`/api/user/${paramId}`),
      app.$axios.get(`/api/getprofileimage/${paramId}`),
      app.$axios.get(`/api/auth/getchatdata/${paramId}`)
    ]);

    const datas = data.data
    const chatData = chatDatas.data
    let imageData;
    if(profileImageData.data.image){
      imageData = 'data:image/jpg;base64,'+profileImageData.data.image;
    }
    return {datas,imageData, chatData}
  },

  data(){
    return {
      ws: null
    }
  },

  computed:{
    sessionUserId(){
      const sessionExist = this.$store.state.session.data[0];
      const data = sessionExist ? this.$store.state.session.data[0].Id : 0;
      return data;
    }
  },

  methods:{
    send(){
      const text = document.querySelector(".chat-input-text");
      const textContent = document.querySelector(".text-content");
      if(!text.value){
        alert("文字を入力してください");
        return;
      }

      if(text.value > 100){
        alert("１００文字以下で入力してください");
        return;
      }
      this.ws.send(
        JSON.stringify({
            FromId: this.sessionUserId,
            ToId: this.datas.Id,
            Text: text.value
          })
      )
      text.value = "";
      }
  },

  mounted(){
    const myId = this.sessionUserId;
    const talkContent = document.querySelector(".talk-content");

    this.ws = new WebSocket(`wss://${process.env.API}/api/auth/chat`);
    this.ws.addEventListener("message", (e) =>{
      const chatMessage = document.createElement("p");
      const messageContent = document.createElement("div");
      //メッセージデータ
      const msg = JSON.parse(e.data);

      if(msg.FromId == myId){
        chatMessage.style.background = "#efefef";
        chatMessage.style.color = "#000000";
        chatMessage.style.padding = "2%";
        chatMessage.style.margin = "1% 3% 0 12%";
        chatMessage.style.float = "right";
        chatMessage.style.clear = "both";
        chatMessage.style.textAlign = "left";
        chatMessage.style.borderRadius = "8px"
      }else{
        chatMessage.style.background = "#ffffff";
        chatMessage.style.color = "#000000";
        chatMessage.style.padding = "2%";
        chatMessage.style.margin = "1% 12% 0 3%";
        chatMessage.style.float = "left";
        chatMessage.style.clear = "both";
        chatMessage.style.textAlign = "left";
        chatMessage.style.borderRadius = "8px";
        chatMessage.style.border = "1px solid rgba(var(--bb2,239,239,239),1)";
      }
      chatMessage.innerHTML = msg.Text;
      messageContent.appendChild(chatMessage);
      talkContent.appendChild(messageContent);

      //トーク最下層にスクロール
      const screenBottom = talkContent.scrollHeight - talkContent.clientHeight;
      talkContent.scroll(0 , screenBottom);
    })
  }
}
</script>

<style scoped>
  html, body { height: 100%; }

  .container{
    padding-top: 3%;
  }

  .talk-wrapper{
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  .talk-header{
    display: flex;
    align-items: center;
    border: 1px solid #dcdcdc;
    padding: 2% 0;
  }

  .talk-head-img-wrapper{
    position: relative;
    width: 6%;
    max-width: 6%;
    height: auto;
    border-radius: 50%;
    border: apx solid #dcdcdc;
    margin: 0 2%;
  }

  .talk-head-img-wrapper::before{
    content: "";
    padding-top: 100%;
    display: block;
  }

  .talk-head-img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    object-fit: cover;
  }

  .talk-content{
    width: 100%;
    height: 76%;
    border: 1px solid #dcdcdc;
    border-bottom: none;
    overflow-y: scroll;
  }

  .from-message{
    float: right;
    color: #000000;
    background-color: #efefef;
    padding: 2%;
    border-radius: 8px;
    margin: 1% 3% 0 12%;
    text-align: left;
    clear: both;
  }

  .to-message{
    float: left;
    color: #000000;
    background-color: #ffffff;
    padding: 2%;
    border-radius: 8px;
    border: 1px solid rgba(var(--bb2,239,239,239),1);
    margin: 1% 12% 0 3%;
    text-align: left;
    clear: both;
  }

  .talk-input-area{
    border: 1px solid #dcdcdc;
    border-top: none;
    padding: 2%;
  }

  .chat-input{
    background-color: #fafafa;
    display: flex;
    border: 1px solid #dcdcdc;
    border-radius: 14px;
    width: 100%;
    padding: 1%;
  }

  .chat-input-text{
    background-color: #fafafa;
    width: 90%;
    border: none
  }

    .chat-input-text:focus{
    outline: 0;
    box-shadow: none;
  }

  .chat-submit-button{
    width: 10%;
    border: none;
    color: #4285f4;
    font-weight: bold;
    background-color: #fafafa;
  }

  .chat-submit-button:focus{
    outline: 0;
    box-shadow: none;
  }

  @media screen and (min-width:320px) and (max-width:414px) {
    html, body { height: 100%; }

    .container{
      padding-top: 14%;
    }

    .talk-content{
      height: 85%;
    }

    .chat-submit-button{
      width: 12%;
    }
  }
</style>