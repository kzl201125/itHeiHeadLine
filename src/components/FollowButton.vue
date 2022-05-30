<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    @click="follow"
    v-if="!is_followed"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    size="small"
    :loading="followLoading"
    @click="follow"
    v-else
    >已关注</van-button
  >
</template>

<script>
import { getArticlrFollowAPI, getArticlrFollowDelAPI } from '@/api'

export default {
  name: 'Follow',
  props: {
    // value: {
    //   type: Boolean,
    //   required: true
    // },
    is_followed: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async follow () {
      this.followLoading = true
      try {
        if (this.is_followed) {
          await getArticlrFollowDelAPI(this.aut_id)
        } else {
          await getArticlrFollowAPI(this.aut_id)
        }
        // 常规的
        // this.$emit('update-follow', !this.is_followed)
        // v-model的
        this.$emit('input', !this.is_followed)
        // .snyc的
        // this.$emit('update:is_followed', !this.is_followed)
        this.$toast.success('操作成功')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.success('不能关注自己')
        }
        console.log('err', err.message)
      }
      this.followLoading = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
</style>
