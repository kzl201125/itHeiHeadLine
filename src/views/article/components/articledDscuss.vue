<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
      @load="onLoad"
    >
      <articleList
        @article_reply="$emit('article_reply', $event)"
        :artList="item"
        v-for="item in commentList"
        :key="item.com_id"
      ></articleList>
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
    },
    commentList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a',
      validator: function (value) {
        return ['a', 'c'].includes(value)
      }
    }
  },
  data () {
    return {
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
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const res = await getArticleDscussAPI({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.commentList.push(...res.data.data.results)
        console.log('this.list', this.commentList)
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
