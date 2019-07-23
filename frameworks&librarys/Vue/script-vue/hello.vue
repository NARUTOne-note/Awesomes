<template>
  <div class="hello">
    <h3>Hello World !</h3>
    <p>{{ date }}, Vue </p>
  </div>  
</template>

<script>
  module.exports = {
    data: function() {
      var NOW_Y = new Date().getFullYear();

      return {
        date: NOW_Y
      }
    }
  }
</script>

<style>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>
