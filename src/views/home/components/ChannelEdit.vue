<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="cell-text">我的频道</div>
      <van-button
        plain
        round
        type="danger"
        size="mini"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10" :border="false">
      <van-grid-item
        @click="handle(index, channel)"
        class="gird-item"
        :class="{ active: active === index }"
        v-for="(channel, index) in channels"
        :key="channel.id"
        :text="channel.name"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-if="isEdit && !whiteList.includes(channel.id)"
        />
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="cell-text">频道编辑</div>
    </van-cell>
    <van-grid :gutter="10" class="recommed-gird">
      <van-grid-item
        class="gird-item"
        @click="addChannel(channel)"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllUserInfoListAPI,
  addUserChannelsAPI,
  deleteUserChannelsAPI
} from '@/api'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      whiteList: [0] // 空白名单
    }
  },
  components: {},
  created () {
    this.getAllChannels()
  },
  mounted () {},
  methods: {
    async getAllChannels () {
      try {
        const {
          data: {
            data: { channels }
          }
        } = await getAllUserInfoListAPI()
        // console.log('res', channels)
        this.allChannels = channels
      } catch (err) {
        console.log('err', err)
      }
    },
    async addChannel (value) {
      this.channels.push(value)
      if (this.user) {
        try {
          await addUserChannelsAPI([
            {
              id: value.id,
              seq: this.addChannel.length + 1
            }
          ])
          this.$toast.success('添加成功')
        } catch (err) {
          console.log('err', err.message)
        }
      }
    },
    async handle (index, channel) {
      if (this.isEdit) {
        if (this.whiteList.includes(channel.id)) return
        // =是负责当自身被删除是向前取
        if (index <= this.active) {
          this.$emit('handle', this.active - 1, true)
        }
        this.channels.splice(index, 1)
        if (this.user) {
          try {
            await deleteUserChannelsAPI(channel.id)
            this.$toast.success('删除成功')
          } catch (err) {
            console.log('err', err.message)
          }
        }
      } else {
        this.$emit('handle', index)
      }
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(
        (channel) =>
          !this.channels.find((myChannel) => myChannel.id === channel.id)
      )
    },
    ...mapState(['user'])
  },
  watch: {
    channels: {
      handler (value) {
        if (!this.user) {
          setItem('TOUTIAO_CHANNELS', value)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  /deep/.my-grid {
    .van-grid-item {
      &.active .van-grid-item__text {
        color: red;
      }
      .van-grid-item__content {
        border-radius: 45%;
        .van-grid-item__icon-wrapper {
          position: unset;
          .van-icon-clear {
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 30px;
            color: #908d8d;
            z-index: 2;
          }
        }
      }
    }
  }
  .cell-text {
    font-size: 32px;
    color: #333333;
  }
  .van-button {
    width: 105px;
    height: 46px;
    color: #f85c5c;
    .van-button__text {
      font-size: 26px;
    }
  }
  /deep/.van-grid-item {
    width: 160px;
    height: 85px;
    .van-grid-item__content {
      font-size: 27px;
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text {
        color: #222;
        margin-top: 0;
      }
    }
  }
  /deep/ .recommed-gird {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 24px;
        margin-right: 5px;
      }
    }
  }
}
</style>
