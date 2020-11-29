<template>
  <div class="box">
    <span class="item-name">{{label}}</span>
    <div class="text-wrap">
      <input :class="classname" :type="type">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    classname: String,
    label: String,
    type: String,
  }
}
</script>

<style scoped>
input{
  width: 100%;
  max-width: 400px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fafafa;
  margin-bottom: 20px;
}

@media screen and (min-width:320px) and (max-width:414px){
  input{
    width: 80%;
  }
}
</style>
