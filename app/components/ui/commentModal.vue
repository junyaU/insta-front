<template>
  <div>
    <p  v-if="comments[0]" class="comment-number" @click="showCommentModal">{{comments.length}}件のコメントを見る</p>
    <div class="over-lay" @click="closeModal">
      <div class="comment-modal">
        <h1 class="comment-header">Comment</h1>
        <div class="comment-content" v-for="(comment,index) in comments" :key="index">
          <nuxt-link :to="{name: 'mypage-id', params:{id: comment.User.Id}}" @click.native="unLockScroll">
            <div class="comment-image-wrapper">
              <img v-lazy="'data:image/jpg;base64,'+comment.User.Imageprofile.Image" class="user-image"  v-if="comment.User.Imageprofile">
              <img src="~/assets/image/noimage.png" class="user-image" v-else>
            </div>
            <div class="content-wrapper">
              <p class="comment-user-name">{{comment.User.Name}}</p>
              <p class="comment-text">{{comment.Comment}}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    comments: Array
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
    border: 2px solid #4285f4;
    overflow: scroll;
  }

  .comment-header{
    position: sticky;
    width: 100%;
    z-index: 101;
    background-color: #fff;
    top: 0;
    border-bottom: 1px solid #4285f4;

  }

  .comment-content{
    display: flex;
    align-items: center;
    padding: 8px;
    position: relative;
    border-bottom: 1px solid #8e8e8e;
    background-color: #fafafa;
  }

  .comment-image-wrapper{
    width: 80px;
    height: 80px;
  }

  .user-image{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #4285f4;
  }

  .comment-user-name{
    font-weight: bold;
    position: absolute;
    font-size: 20px;
    top: 9%;
    left: 20%;
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
  }
</style>