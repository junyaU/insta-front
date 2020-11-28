<template>
  <div>
    <textarea :class="classname" rows="6" cols="60"></textarea>
  </div>
</template>

<script>
export default {
  props:{
    name: String,
    classname: String
  }
}
</script>

<style scoped>
  textarea{
  width: 40%;
  height: 200px;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

@media screen and (min-width:320px) and (max-width:414px){
  textarea{
    width: 60%;
    height: 200px;
  }
}
</style>