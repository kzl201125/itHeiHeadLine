<template>
  <div class="article-reply">
    <van-nav-bar fixed :title="`${articleRep.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <articledList :artList="articleRep"></articledList>
    <van-cell title="全部回复" />
    <articledDscuss
      type="c"
      :source="articleRep.com_id"
      :commentList="commentList"
    ></articledDscuss>
    <div class="reply-container">
      <van-button round type="default" @click="show = true">写评论</van-button>
    </div>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    >
      <articleComment
        @updateShow="updateShowFn"
        :ArtComment="articleRep.com_id"
        :art_id="art_id"
      ></articleComment>
    </van-popup>
  </div>
</template>

<script>
import articledList from './article-list.vue'
import articledDscuss from './articledDscuss.vue'
import articleComment from './article-comment.vue'
export default {
  name: 'articleReply',
  props: {
    articleRep: {
      type: Object,
      required: true
    },
    art_id: {
      type: String
    }
  },
  data () {
    return {
      commentList: [],
      value: '',
      show: false
    }
  },
  components: {
    articledList,
    articledDscuss,
    articleComment
  },
  created () {},
  mounted () {},
  methods: {
    updateShowFn (value) {
      this.articleRep.reply_count++
      this.commentList.unshift(value)
      this.show = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.article-reply {
  .reply-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-button {
      width: 60%;
    }
  }
}
</style>
