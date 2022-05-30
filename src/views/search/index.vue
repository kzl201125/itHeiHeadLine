<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#ffd700"
        @search="onSearch"
        @focus="isResult = false"
        @cancel="$router.back()"
      />
    </form>
    <search-result v-if="isResult" :searchText="searchText" />
    <search-suggestion @update="onSearch" v-else-if="searchText" :searchText="searchText" />
    <search-history @closeAll="searchHistories = []" @update="onSearch" v-else :searchHistories="searchHistories" />
  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchSuggestion from './components/searchSuggestion.vue'
import searchResult from './components/searchResult.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'Search',
  data () {
    return {
      isResult: false,
      searchText: '',
      searchHistories: getItem('TOUTIAO_HISTORY') || []
    }
  },
  components: {
    searchHistory,
    searchSuggestion,
    searchResult
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      this.isResult = true
      this.searchText = val
      const index = this.searchHistories.indexOf(this.searchText)
      if (index > -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)
    }
  },
  computed: {},
  watch: {
    searchHistories: {
      handler () {
        setItem('TOUTIAO_HISTORY', this.searchHistories)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
