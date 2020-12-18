<template>
<div class="post-edit-overlay">
  <div class="post-edit-modal">
    <!-- もう少し機能が充実してからつくる -->
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .post-edit-modal{
    background-color: #ffffff;
    z-index: 101;
    position: absolute;
    width: 35%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;

  }

  .post-edit-overlay{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    /* background: rgba(0,0,0,.5); */

  }

</style>
