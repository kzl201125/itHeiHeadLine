<template>
  <div class="user-nickname">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
   <div class="nickname-box">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="12"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { getUpdateProfileAPI } from '@/api'
export default {
  name: 'UserNickname',
  props: {
    // nickName: {
    //   type: String,
    //   required: true
    // }
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // message: this.nickName
      message: this.value
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onClickRight () {
      if (!this.message) {
        this.$toast.fail('不能为空')
      }
      this.$toast.loading({
        message: '正在保存...',
        forbidClick: true,
        duration: 0
      })
      try {
        await getUpdateProfileAPI({
          name: this.message
        })
        this.$toast.success('修改成功')
        this.$emit('close')
        // this.$emit('update:nickName', this.message)
        this.$emit('input', this.message)
        this.message = ''
      } catch (err) {
        this.$toast.fail('保存失败')
        console.log('err', err.message)
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.user-nickname{
  .nickname-box {
    display: flex;
    justify-content: center;
    padding: 30px 0;
    .van-cell {
      width: 700px;
    }
  }
}
</style>
