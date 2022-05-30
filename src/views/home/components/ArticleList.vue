<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <!-- 列表内容 -->
        <Articleltem
          v-for="(item, index) in list"
          :key="index"
          :articleItem="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getUserListAPI } from '@/api'
import Articleltem from '@/components/Articleltem.vue'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    Articleltem
  },
  name: 'ArticleList',
  data () {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      timestamp: 0,
      refreshing: false,
      successText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getUserListAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // if (Math.random() > 0.6) {
        //   JSON.parse('dkjshjhjshjksa')
        // }
        const {
          data: { results }
        } = data
        this.list.push(...results)
        // console.log('results', results)
        // console.log('list', this.list)
        this.loading = false
        if (data.data.results) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        console.log('请求失败，稍后再试')
        console.log('err', err.message)
      }
    },
    async onRefresh () {
      try {
        const { data } = await getUserListAPI({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        if (Math.random() > 0.6) {
          JSON.parse('dkjshjhjshjksa')
        }
        const {
          data: { results }
        } = data
        this.list.unshift(...results)
        this.refreshing = false
        this.successText = `刷新成功，请求到了${results.length}条数据`
      } catch (err) {
        this.refreshing = false
        this.successText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // padding-top: 95px;
  height: calc(100vh - 210px - 60px);
  overflow-y: auto;
}
</style>
