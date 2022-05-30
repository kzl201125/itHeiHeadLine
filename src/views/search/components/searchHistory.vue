<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
      <div v-else>
        <span @click="$emit('closeAll')" class="clearAll-btn">全部删除</span>
        <span class="finish-btn" @click="isEdit = false">完成</span>
      </div>
    </van-cell>
    <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index">
      <van-icon @click="close(index,item)" name="close" v-if="isEdit" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isEdit: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    close (index, item) {
      if (this.isEdit) {
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('update', item)
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.search-history {
  .van-cell {
    .clearAll-btn {
      margin-right: 10px;
    }
  }
}
</style>
