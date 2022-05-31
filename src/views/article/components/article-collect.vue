<template>
  <van-icon
    v-if="!is_collected"
    @click="collectFn"
    color="#777"
    name="star-o"
  />
  <van-icon v-else @click="collectFn" color="#ff0000" name="star-o" />
</template>

<script>
import { getArticleCollectAPI, getArticleCollectDelAPI } from '@/api'
export default {
  name: 'ArticleCollect',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    artid: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {}
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async collectFn () {
      try {
        if (this.is_collected) {
          await getArticleCollectDelAPI(this.artid)
        } else {
          await getArticleCollectAPI(this.artid)
        }
        this.$emit('update:is_collected', !this.is_collected)
        this.$toast.success('操作成功')
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
