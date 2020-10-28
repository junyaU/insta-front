<template>
  <header>
      <div class="header-parts">
        <p>Home</p>
      </div>
      <div class="header-parts">
        <p>Login</p>
      </div>
      <div class="header-parts">
        <p>Post</p>
      </div>
  </header>
</template>

<script>
export default {
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
  }

  .header-parts{
    cursor: pointer;
  }
</style>