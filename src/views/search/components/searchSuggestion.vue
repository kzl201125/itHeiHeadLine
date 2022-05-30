<template>
  <div class="search-suggestion">
    <van-cell @click="$emit('update',item)" v-for="(item,index) in sugguestionList" :key="index" >
      <span slot="title" v-html="renderHtml(item)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSugguestiomListAPI } from '@/api'
// 鲁大师
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      sugguestionList: [],
      trimer: null
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    renderHtml (value) {
      // 第二种方法
      return value.split(this.searchText).join(`<span class="active">${this.searchText}</span>`)
      // 第一种方法
      // const reg = new RegExp(this.searchText, 'g')
      // return value.replace(reg, `<span class="active">${this.searchText}</span>`)
    },
    async getSearchList () {
      try {
        const {
          data: {
            data: { options }
          }
        } = await getSearchSugguestiomListAPI(this.searchText)
        // console.log(options)
        this.sugguestionList = options.filter((v) => v)
      } catch (err) {
        console.log('err', err.message)
      }
    }
  },
  computed: {},
  watch: {
    searchText: {
      // handler () {
      //   // 节流阀
      //   if (this.trimer) clearTimeout(this.trimer)
      //   this.trimer = setTimeout(() => {
      //     this.getSearchList()
      //   }, 1000)
      // },
      handler: debounce(function (val) {
        // console.log('val', val)
        this.getSearchList()
      }, 500),
      immediate: true
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/.active{
    color: #87ceeb;
  }
}
</style>
