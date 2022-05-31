<template>
  <van-icon v-if="!show" @click="getArticleLike" color="#777" name="good-job-o" />
  <van-icon v-else @click="getArticleLike" color="#ff0000" name="good-job-o" />
</template>

<script>
import {
  getArticleLikingAPI,
  getArticleLikeAPI,
  getArticleLikingDelAPI,
  getArticleLikeDelAPI
} from '@/api'
export default {
  name: 'ArticleLike',
  props: {
    artid: {
      type: [String, Number],
      required: true
    },
    attitude: {
      type: [String, Number],
      required: true
    },
    like_count: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async getArticleLike () {
      try {
        if (this.like_count === 0) {
          await getArticleLikeDelAPI(this.artid)
          this.$emit('update:like_count', -1)
        } else {
          await getArticleLikeAPI(this.artid)
          this.$emit('update:like_count', 0)
        }
        if (this.attitude === -1) {
          const res = await getArticleLikingAPI(this.artid)
          this.$emit('update:attitude', 1)
          console.log(res)
          this.$toast.success('点赞成功')
        } else {
          await getArticleLikingDelAPI(this.artid)
          this.$emit('update:attitude', -1)
          this.$toast.success('取消点赞')
        }
        this.show = !this.show
      } catch (err) {
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
