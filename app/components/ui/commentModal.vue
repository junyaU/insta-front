<template>
  <div>
    <p  v-if="comments[0]" class="comment-number" @click="showCommentModal">{{comments.length}}件のコメントを見る</p>
    <div class="over-lay" @click="closeModal">
      <div class="comment-modal">
        <div class="comment-header">
          <div class="header-wrapper">
            <div class="post-user-image-wrapper">
              <img class="post-user-image" v-lazy="'data:image/jpg;base64,'+image.Image" alt="" v-if="image">
              <img class="post-user-image" src="~assets/image/noimage.png" v-else>
            </div>
            <p><span class="user-name-point">{{user}}</span>の投稿</p>
          </div>
        </div>
        <div class="comment-content" v-for="(comment,index) in comments" :key="index">
          <div class="comment-image-wrapper">
            <img v-lazy="'data:image/jpg;base64,'+comment.User.Imageprofile.Image" class="user-image"  v-if="comment.User.Imageprofile">
            <img src="~/assets/image/noimage.png" class="user-image" v-else>
          </div>
          <div class="content-wrapper">
            <nuxt-link :to="{name: 'mypage-id', params:{id: comment.User.Id}}" @click.native="unLockScroll">
              <p class="comment-user-name">{{comment.User.Name}}</p>
            </nuxt-link>
            <p class="comment-text">{{comment.Comment}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    comments: Array,
    user: String,
    image: Object
  },

  methods:{
    showCommentModal(e){
      const overLay = e.target.nextElementSibling;
      const targetModal = e.target.nextElementSibling.firstElementChild;

      targetModal.style.display = "block";
      overLay.style.display = "block";
      this.lockScroll(targetModal)
    },

    closeModal(e){
      const targetDom = e.target
      const targetClassName = targetDom.className;
      const overLayClassName = "over-lay"
      //モーダル以外のところをクリックした時だけモーダルを閉じる
      if(targetClassName != overLayClassName){
        return
      }
      targetDom.style.display = "none"
      this.unLockScroll()
    },

    lockScroll(targetModal) {
      document.addEventListener("mousewheel", this.handleScroll, { passive: false });
      document.addEventListener("touchmove", this.handleScroll, { passive: false });
      targetModal.addEventListener("mousewheel", this.modalScroll, { passive: false });
      targetModal.addEventListener("touchmove", this.modalScroll, { passive: false });
      document.body.style.overflow = "hidden";
    },

    unLockScroll() {
      document.removeEventListener("mousewheel", this.handleScroll, { passive: false });
      document.removeEventListener("touchmove", this.handleScroll, { passive: false });
      document.body.style.overflow = "visible";
    },

    handleScroll(e) {
      e.preventDefault();
    },

    modalScroll(e){
      e.stopPropagation();
    },
  },
}
</script>

<style>
  .comment-number{
    text-align: left;
    margin-left: 3%;
    color:#8e8e8e;
    width: 50%;
    margin-bottom: 5px;
  }

  .comment-modal{
    background-color: #ffffff;
    z-index: 101;
    position: absolute;
    width: 40%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    overflow: scroll;
  }

  .comment-header{
    position: sticky;
    width: 100%;
    margin: 0 auto;
    z-index: 101;
    background-color: #fff;
    top: 0;
    border-bottom: 1px solid #dcdcdc;
  }

  .header-wrapper{
    display: flex;
    margin: 0 auto;
    text-align: center;
    width: 50%;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2% 0;
  }

  .user-name-point{
    font-weight: bold;
  }

  .post-user-image-wrapper{
    position: relative;
    width: 10%;
    max-width: 10%;
    height: auto;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
  }

  .post-user-image-wrapper::before{
    content: "";
    display: block;
    padding-top: 100%;
  }

  .post-user-image{
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

  .comment-content{
    display: flex;
    align-items: center;
    padding: 2%;
    position: relative;
    background-color: #fafafa;
  }

  .comment-image-wrapper{
    position: relative;
    width: 10%;
    max-width: 10%;
    height: auto;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    margin: 0 2%;
  }

  .comment-image-wrapper::before{
    content: "";
    display: block;
    padding-top: 100%;
  }

  .user-image{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;

  }

  .content-wrapper{
    display: flex;
    align-items: center;
  }

  .comment-user-name{
    font-weight: bold;
    font-size: 20px;
    text-align: left;
  }

  .comment-text{
    margin-left: 8px;
    text-align: left;
  }

  .over-lay{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(0,0,0,.5);
    display: none;
  }

  a{
    color: inherit;
    text-decoration: none;
  }

  @media screen and (min-width:320px) and (max-width:414px) {
    .comment-number{
      font-size: 8px;
      width: 46%;
    }

    .comment-modal{
      width: 75%;
      height: 45%
    }

    .comment-user-name{
      font-size: 8px;
    }

    .comment-text{
      font-size: 8px;
    }
  }
</style>