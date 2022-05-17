<template>
  <div id="app">
    <h1>黑马头条</h1>
    <router-view />
    <div>
      <i class="ithei ithei-lishi"></i>
    </div>
    <van-button >主要按钮</van-button>
    <div id="one">
      hello word
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
#one {
  width: 300px;
  height: 50px;
  background: gold;
}
</style>
