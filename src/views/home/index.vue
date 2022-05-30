<template>
  <div class="home-container">
    <!-- 头部导航 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        @click="$router.push('/search')"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- v-tab="userInfoList" -->
    <van-tabs v-tab="userInfoList" class="channel-tab" v-model="active" animated swipeable>
      <van-tab v-for="item in userInfoList" :key="item.id" :title="item.name">
      <!-- 列表展示 -->
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isEditChannelShow = true"
      >
        <i class="ithei ithei-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="isEditChannelShow"
      closeable
      round
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
    <!-- 频道编辑 -->
      <ChannelEdit :channels="userInfoList" :active="active" @handle="handleUpdateFn"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoListAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      userInfoList: [],
      isEditChannelShow: false
    }
  },
  methods: {
    async getUserInfoList () {
      const channels = getItem('TOUTIAO_CHANNELS')
      if (this.user || !channels) {
        try {
          const {
            data: {
              data: { channels }
            }
          } = await getUserInfoListAPI()
          this.userInfoList = channels
        } catch (error) {
          console.log('请求失败')
        }
      } else {
        this.userInfoList = channels
      }
    },
    handleUpdateFn (index, close = false) {
      this.active = index
      this.isEditChannelShow = close
    }
  },
  created () {
    this.getUserInfoList()
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 97px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 60px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel-tab {
    padding-top: 80px;
    // padding-bottom: 4px;
    .van-tab {
      min-width: 192px;
      height: 82px;
      border-right: 1px solid #edeff3;
      font-size: 28px;
      color: #777777;
    }
    .van-tabs__wrap {
      border-bottom: 1px solid #edeff3;
      position: fixed;
      top: 94px;
      z-index: 2;
      width: 100%;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      margin-bottom: 8px;
      background-color: #3296fa;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: rgba(255, 255, 255, 0.902);
    i.ithei {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 58px;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
