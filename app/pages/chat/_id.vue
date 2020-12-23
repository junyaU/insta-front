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
          <div class="from-message" v-if="data.From.Id == sessionUserId">
            <p class="from-message-time">{{data.Created}}</p>
            <p class="from-message-text">{{data.Text}}</p>
          </div>
          <div class="to-message" v-else>
            <p class="to-message-text">{{data.Text}}</p>
            <p class="to-message-time">{{data.Created}}</p>
          </div>
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

    chatData.forEach(data => {
      //時間をフォーマット Tips:safariではnew Dateでハイフンが含まれているとNanとなってしまうので置き換える必要あり
      const timeData = data.Created.replace(/[A-Z]/g, " ");
      const timeDataFormat = new Date(timeData.replace(/-/g,"/"));
      const chatTime = `${('00'+timeDataFormat.getHours()).slice(-2)}:${('00'+timeDataFormat.getMinutes()).slice(-2)}`;
      data.Created = chatTime;
    });

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
      const chatTime = document.createElement("p");
      const chatWrapper = document.createElement("div");
      const messageContent = document.createElement("div");
      const msg = JSON.parse(e.data);
      const ownCheck = msg.FromId == myId;
      const nowTime = new Date();
      const timeValue = `${('00'+nowTime.getHours()).slice(-2)}:${('00'+nowTime.getMinutes()).slice(-2)}`;

      //送り主によってスタイルを切り替え
      const chatBackColor = (ownCheck) ? "#efefef" : "#ffffff";
      const chatBorder = (ownCheck) ? "none" : "1px solid rgba(var(--bb2,239,239,239),1)";
      const chatFontColor = "#000000";
      const chatPadding = "2%";
      const chatborderRadius = "8px";
      const wrapperDisplay = "flex";
      const wrapperAlignItems = "flex-end";
      const wrapperJustifyContent = (ownCheck) ? "flex-end" : "flex-start";
      const wrapperTextAlign = "left";
      const wrapperMarginTop = "1%";
      const wrapperPadding = "0 3%";
      const wrapperWidth = "100%";
      const timeColor = "#8e8e8e";
      const timeMargin = (ownCheck) ? "0 1% 0 0" : "0 0 0 1%";
      const timeFontSize = "10px";

      chatMessage.style.background = chatBackColor;
      chatMessage.style.color = chatFontColor;
      chatMessage.style.padding = chatPadding;
      chatMessage.style.borderRadius = chatborderRadius;
      chatMessage.style.border = chatBorder;
      chatWrapper.style.display = wrapperDisplay;
      chatWrapper.style.alignItems = wrapperAlignItems;
      chatWrapper.style.justifyContent = wrapperJustifyContent;
      chatWrapper.style.textAlign = wrapperTextAlign;
      chatWrapper.style.marginTop = wrapperMarginTop;
      chatWrapper.style.padding = wrapperPadding;
      chatWrapper.style.width = wrapperWidth;
      chatTime.style.color = timeColor;
      chatTime.style.margin = timeMargin;
      chatTime.style.fontSize = timeFontSize;

      chatMessage.innerHTML = msg.Text;
      chatTime.innerHTML = timeValue;

      //時間の表記の兼ね合いで前後を変えなければいけない
      if(ownCheck){
        chatWrapper.appendChild(chatTime);
        chatWrapper.appendChild(chatMessage);
      }else{
        chatWrapper.appendChild(chatMessage);
        chatWrapper.appendChild(chatTime);
      }

      messageContent.appendChild(chatWrapper);
      talkContent.appendChild(messageContent)

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
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    text-align: left;
    margin-top: 1%;
    padding: 0 3%;
    width: 100%;
  }

  .from-message-text{
    padding: 2%;
    color: #000000;
    background-color: #efefef;
    border-radius: 8px;
  }

  .from-message-time{
    color: #8e8e8e;
    margin-right: 1%;
    font-size: 10px;
  }

  .to-message{
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    margin-top: 1%;
    padding: 0 3%;
    width: 100%;
    text-align: left;
  }

  .to-message-text{
    color: #000000;
    background-color: #ffffff;
    border: 1px solid rgba(var(--bb2,239,239,239),1);
    border-radius: 8px;
    padding: 2%;
  }

  .to-message-time{
    color: #8e8e8e;
    margin-left: 1%;
    font-size: 10px;
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
    background: none;
  }

  .chat-submit-button:focus{
    outline: 0;
    box-shadow: none;
  }

  @media screen and (min-width:320px) and (max-width:414px) {
    html, body { height: 90%; }

    .container{
      padding-top: 14%;
    }

    .talk-content{
      height: 72%;
    }

    .chat-submit-button{
      width: 12%;
    }

    .from-message-time{
      font-size: 8px;
    }

    .to-message-time{
      font-size: 10px;
    }
  }
</style>