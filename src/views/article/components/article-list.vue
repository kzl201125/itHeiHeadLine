<template>
  <div>
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="artList.aut_photo"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{ artList.aut_name }}</div>
        <van-button class="like-btn" icon="good-job-o">赞</van-button>
      </div>

      <div slot="label">
        <p class="comment-content">{{ artList.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{
            artList.pubdate | RelativeTime
          }}</span>
          <van-button class="reply-btn" round @click="$emit('article_reply',artList)"
            >回复 {{ artList.reply_count }}</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    artList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  components: {},
  created () {},
  mounted () {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
