<template>
  <van-cell class="article-item" @click="clickFn">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ articleItem.title }}
    </div>
    <div slot="label">
      <div class="cover-wrap">
        <div
          class="cover-item"
          v-for="(item, index) in articleItem.cover.images"
          :key="index"
        >
          <van-image
            v-if="articleItem.cover.type === 3"
            class="cover-item-img"
            :src="item"
            fit="cover"
          />
        </div>
      </div>
      <div class="label-info-wrap">
         <span>{{ articleItem.aut_name }}</span>
      <span>{{ articleItem.comm_count }}评论</span>
      <span>{{ articleItem.pubdate | RelativeTime }}</span>
      </div>
    </div>
    <van-image
      slot="default"
      class="right-cover"
      v-if="articleItem.cover.type === 1"
      fit="cover"
      :src="articleItem.cover.images[0]"
    />
    <!-- <van-image
      slot="default"
      class="right-cover"
      fit="cover"
      src="http://192.168.14.26:3000/image/huge.webp"
    /> -->
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    articleItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickFn () {
      this.$router.push(`/article/${this.articleItem.art_id}`)
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 31px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 234px;
    height: 149px;
    margin-left: 25px;
    .right-cover {
      width: 234px;
      height: 149px;
    }
  }
  .cover-wrap{
    display: flex;
    padding: 30px 0;
    .cover-item{
      &:not(:last-child){
        margin-right: 4px;
      }
      .cover-item-img{
        width: 234px;
        height: 149px;
      }
    }
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    &:not(:last-child) {
      margin-right: 25px;
    }
  }
}
</style>
