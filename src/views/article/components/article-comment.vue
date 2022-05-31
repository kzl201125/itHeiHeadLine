<template>
  <div class="asrticle-container">
    <van-cell>
      <van-field
        v-model="articleCommit"
        clearable
        autosize
        maxlength="50"
        placeholder="请输入评论内容"
        show-word-limit
      >
        <van-button
          :disabled="!articleCommit"
          slot="button"
          size="mini"
          type="info"
          @click="ArtCommentFn"
          >发布</van-button
        >
      </van-field>
    </van-cell>
  </div>
</template>

<script>
import { getArticleCommentAPI } from '@/api'
export default {
  name: 'articleCommentIndex',
  props: {
    ArtComment: {
      type: [String, Number, Object],
      required: true
    },
    art_id: {
      type: String
    }
  },
  data () {
    return {
      articleCommit: ''
    }
  },
  // 接收方
  // inject:['articleId'],从父级的父级上拿元素
  components: {},
  created () {},
  mounted () {},
  methods: {
    async ArtCommentFn () {
      try {
        const res = await getArticleCommentAPI({
          target: this.ArtComment,
          content: this.articleCommit,
          art_id: this.art_id
        })
        this.$toast.success('成功')
        console.log(res)
        this.$emit('updateShow', res.data.data.new_obj)
        this.articleCommit = ''
      } catch (err) {
        console.log('err', err.message)
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.asrticle-container {
  padding: 91px 0;
}
</style>
