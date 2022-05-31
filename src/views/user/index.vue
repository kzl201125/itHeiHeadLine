<template>
  <div class="my-profile">
    <van-nav-bar title="个人信息" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <div class="my-list">
      <input type="file" ref="userPhoto" hidden @change="change" />
      <van-cell title="头像">
        <div slot="default" @click="$refs.userPhoto.click()">
          <van-image round fit="cover" :src="profileObj.photo" />
          <van-icon name="arrow" />
        </div>
      </van-cell>
      <van-cell title="昵称">
        <div slot="default" @click="nickShow = true">
          <span>{{ profileObj.name }}</span>
          <van-icon name="arrow" />
        </div>
      </van-cell>
      <van-cell title="性别">
        <div slot="default" @click="sexShow = true">
          <span>{{ profileObj.gender === 0 ? "男" : "女" }}</span>
          <van-icon name="arrow" />
        </div>
      </van-cell>
      <van-cell title="生日">
        <div slot="default" @click="yearShow = true">
          <span>{{ profileObj.birthday || "1990-10-20" }} </span>
          <van-icon name="arrow" />
        </div>
      </van-cell>
    </div>
    <van-popup v-model="nickShow" position="bottom" :style="{ height: '100%' }">
      <userNickname
        v-if="nickShow"
        v-model="profileObj.name"
        @close="nickShow = false"
      />
      <!-- <userNickname
        v-if="nickShow"
        :nickName.sync="profileObj.name"
        @close="nickShow = false"
      /> -->
    </van-popup>
    <van-popup v-model="sexShow" position="bottom" :style="{ height: '50%' }">
      <userSex
        v-if="sexShow"
        :sex.sync="profileObj.gender"
        @close="sexShow = false"
      />
    </van-popup>
    <van-popup v-model="yearShow" position="bottom" :style="{ height: '50%' }">
      <userYear
        v-if="yearShow"
        :year.sync="profileObj.birthday"
        @close="yearShow = false"
      />
    </van-popup>
    <van-popup
      v-model="photoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <userPhoto
        v-if="photoShow"
        :photo="imgUrl"
        @close="photoShow = false"
        @update:photo="profileObj.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileAPI } from '@/api'
import userNickname from './components/user-nickname.vue'
import userSex from './components/user-sex.vue'
import userYear from './components/user-date.vue'
import userPhoto from './components/user-photo.vue'
export default {
  name: 'MyProfile',
  data () {
    return {
      profileObj: {},
      nickShow: false,
      sexShow: false,
      yearShow: false,
      photoShow: false,
      imgUrl: ''
    }
  },
  components: {
    userNickname,
    userSex,
    userYear,
    userPhoto
  },
  created () {
    this.getUserList()
  },
  mounted () {},
  methods: {
    async getUserList () {
      try {
        const res = await getUserProfileAPI()
        // console.log('res', res)
        this.profileObj = res.data.data
        console.log(this.profileObj)
      } catch (err) {
        console.log('err', err.message)
      }
    },
    change (e) {
      this.imgUrl = window.URL.createObjectURL(e.target.files[0])
      this.photoShow = true
      // 清除缓存
      e.target.value = ''
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.my-profile {
  .my-list {
    padding-top: 6px;
    .van-cell {
      display: flex;
      align-items: center;
      height: 124px;
      .van-cell__title {
        color: #333;
        flex: 1;
      }
      .van-cell__value {
        span {
          margin-right: 10px;
          color: #222121;
        }
        /deep/ .van-image {
          width: 100px;
          height: 100px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }
  .van-popup {
    background: #f5f7f9;
  }
}
</style>
