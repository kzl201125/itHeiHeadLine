<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div
        class="article-detail markdown-body"
        v-else-if="articleDetail.art_id"
      >
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetail.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetail.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleDetail.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleDetail.pubdate | RelativeTime }}
          </div>
          <!-- <Follow
            :aut_id="articleDetail.aut_id"
            :is_followed="articleDetail.is_followed"
            @update-follow="articleDetail.is_followed = $event"
          ></Follow> -->
          <Follow
            :aut_id="articleDetail.aut_id"
            :is_followed.sync="articleDetail.is_followed"
          ></Follow>
          <!-- <Follow
            :aut_id="articleDetail.aut_id"
            v-model="articleDetail.is_followed"
          ></Follow> -->
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="follow"
            v-if="!articleDetail.is_followed"
          >关注</van-button>
          <van-button
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
            @click="follow"
            v-else
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="articleImagesd"
          class="article-content"
          v-html="articleDetail.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <articledDscuss
          :commentList="commentList"
          :source="articleDetail.art_id"
          @article_reply="articleReply"
        ></articledDscuss>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="notFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="retry">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon
        name="comment-o"
        :badge="articleDetail.comm_count"
        color="#777"
      />
      <articleCollect
        v-if="articleDetail.art_id"
        :is_collected.sync="articleDetail.is_collected"
        :artid="articleDetail.art_id"
      />
      <articleLike
        v-if="articleDetail.art_id"
        :artid="articleDetail.art_id"
        :attitude.sync="articleDetail.attitude"
        :like_count.sync="articleDetail.like_count"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <van-popup
      v-model="isPostShow"
      position="bottom"
      closeable
      :style="{ height: '30%' }"
    >
      <articledComment
        :ArtComment="articleDetail.art_id"
        @updateShow="updateShowFn"
      ></articledComment>
    </van-popup>
    <van-popup
      v-model="isPostShowReply"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <articleReply
        v-if="isPostShowReply"
        :articleRep="articleRep"
        @close="isPostShowReply = false"
        :art_id="article"
      >
      </articleReply>
    </van-popup>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import './github-article.css'
import {
  getArticlrDetailAPI,
  getArticlrFollowAPI,
  getArticlrFollowDelAPI
} from '@/api'
import { ImagePreview } from 'vant'
// 列表
import articledDscuss from './components/articledDscuss.vue'
// 写评论弹出框
import articledComment from './components/article-comment.vue'
// 评论的评论弹出框
import articleReply from './components/articleReply.vue'
// 收藏组件
import articleCollect from './components/article-collect.vue'
// 点赞组件
import articleLike from './components/article-like.vue'
export default {
  name: 'ArticleIndex',
  components: {
    articledDscuss,
    articledComment,
    articleReply,
    articleCollect,
    articleLike
  },
  props: {
    article: {
      type: [Number, String],
      required: true
    }
  },
  // 提供方
  // provide () {
  //   return {
  //     articleId: this.article
  //   }
  // },
  data () {
    return {
      articleDetail: {},
      loading: true,
      notFound: false,
      followLoading: false,
      isPostShow: false,
      commentList: [],
      isPostShowReply: false,
      articleRep: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticlrDetail()
  },
  mounted () {},
  methods: {
    async getArticlrDetail () {
      try {
        const res = await getArticlrDetailAPI(this.article)
        // if (Math.random() > 0.6) {
        //   JSON.parse('12u32894')
        // }
        this.articleDetail = res.data.data
        console.log('list', this.articleDetail)
        this.$nextTick(() => {
          this.previewImg()
        })
        // console.log('articleDetail', this.articleDetail)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.notFound = true
        }
        console.log('err', err.message)
      }
      this.loading = false
    },
    retry () {
      this.loading = true
      this.getArticlrDetail()
    },
    previewImg () {
      const res = this.$refs.articleImagesd.querySelectorAll('img')
      const list = []
      res.forEach((evemt, index) => {
        list.push(evemt.src)
        evemt.onclick = () => {
          ImagePreview({
            images: list,
            startPosition: index
          })
        }
      })
    },
    async follow () {
      this.followLoading = true
      try {
        if (this.articleDetail.is_followed) {
          await getArticlrFollowDelAPI(this.articleDetail.aut_id)
        } else {
          await getArticlrFollowAPI(this.articleDetail.aut_id)
        }
        this.articleDetail.is_followed = !this.articleDetail.is_followed
        this.$toast.success('操作成功')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.success('不能关注自己')
        }
        console.log('err', err.message)
      }
      this.followLoading = false
    },
    updateShowFn (value) {
      this.isPostShow = false
      this.commentList.unshift(value)
      this.articleDetail.comm_count++
    },
    articleReply (value) {
      this.articleRep = value
      console.log('rep', this.articleRep)
      this.isPostShowReply = true
    }
  }
  // model: {
  //   prop: 'is_followed', value
  //   event: 'update-follow' input
  // }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
