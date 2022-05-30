<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id">
        <span slot="title"> {{ item.title }}</span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearhResultListAPI } from '@/api'
export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pageSize: 10,
      error: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const res = await getSearhResultListAPI({
          page: this.page,
          per_page: this.pageSize,
          q: this.searchText
        })
        this.list.push(...res.data.data.results)
        this.loading = false
        if (res.data.data.results.length) {
          this.page++
        } else {
          this.finished = false
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
