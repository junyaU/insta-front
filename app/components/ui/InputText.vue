<template>
  <div class="box">
    <span class="item-name">{{label}}</span>
    <div class="text-wrap">
      <input :type="type" :name="name">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    label: String,
    name: String,
    type: String
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
  margin-bottom: 20px;
}

</style>
