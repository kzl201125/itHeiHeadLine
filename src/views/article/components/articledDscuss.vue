<template>
  <div>
    评论
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
    <articleList :artList="item" v-for="item in list" :key="item.com_id"></articleList>
    </van-list>
  </div>
</template>

<script>
import articleList from './article-list.vue'
import { getArticleDscussAPI } from '@/api'
export default {
  name: 'ArticleDiscuss',
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10
    }
  },
  components: {
    articleList
  },
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const res = await getArticleDscussAPI({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.list.push(...res.data.data.results)
        console.log('this.list', this.list)
        console.log(res)
        this.loading = false
        if (res.data.data.length) {
          this.offset = res.data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
        console.log('err', err.message)
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
</style>
