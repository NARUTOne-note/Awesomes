<template >
  <div>
    <!-- <p class="comment-info">页面注释</p> -->
  	<p class="message-info">此页面不存在</p>
    <p class="message-text">请检查您输入的网址是否正确</p>
    <p>{{ greeting }} World!</p>
  </div>
</template>
<script >
export default {
  data () {
    return {
      greeting: "Hello"
    };
  },
  mounted () {
    // 注释
    this.greeting = "Goodbye";
  }
};
</script>
<style  scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
