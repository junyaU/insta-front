<template>
  <div class="loading" v-if="loading">
    <h1>Loading...</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),

  methods: {
    start(){
      this.loading = true
    },

    finish(){
      this.loading = false
    }
  }

}
</script>

<style scoped>
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: #ffffff;
  }

  .loading h1{
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 35px;
    transform: translate(-50%, -50%);
  }
</style>