<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header login-info" v-if="user" >
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src=" userInfo.photo "
            fit="cover"
            round
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button round size="mini" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">点赞数</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <van-grid clickable :column-num="2" class="grid-nav mb-9">
      <van-grid-item class="grid-item">
        <i slot="icon" class="ithei ithei-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="ithei ithei-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'My',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        message: '确认退出吗？'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {
        console.log('取消')
      })
    },
    async loadUser () {
      try {
        const { data } = await getUserInfoAPI()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$dialog.alert('请求错误，请稍后')
      }
    }
  },
  created () {
    if (this.user) {
      this.loadUser()
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .login-info {
    .base-info {
      height: 231px;
      padding: 75px 23px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 133px;
          height: 133px;
          margin-right: 23px;
        }
        .name {
          font-size: 29px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item{
        height: 133px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
         .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.ithei {
        font-size: 45px;
      }
      .ithei-shoucang {
        color: #eb5253;
      }
      .ithei-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}

</style>
