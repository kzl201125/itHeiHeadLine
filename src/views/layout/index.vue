<template>
  <div class="layout-container">
    <router-view ></router-view>
    <van-tabbar route class="layout-tabbar" >
      <van-tabbar-item to="/layout/home" >
        <i slot="icon" class="ithei ithei-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/questions" >
        <i slot="icon" class="ithei ithei-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/video" >
        <i slot="icon" class="ithei ithei-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/my" >
        <i slot="icon" class="ithei ithei-wode"></i>
        <span class="text">{{ user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.ithei {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
