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
        <van-button slot="button" size="mini" type="info" @click="ArtCommentFn">发布</van-button>
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
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articleCommit: ''
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async ArtCommentFn () {
      try {
        await getArticleCommentAPI({
          target: this.ArtComment.art_id,
          content: this.articleCommit
        })
        this.$toast.success('成功')
        this.$emit('updateShow', false)
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
