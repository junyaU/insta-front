<template>
  <div>
    <textarea :name="name" rows="8" cols="80"></textarea>
  </div>
</template>

<script>
export default {
  props:['name']
}
</script>

<style scoped>
  textarea{
  width: 40%;
  height: 300px;
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