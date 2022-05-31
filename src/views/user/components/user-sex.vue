<template>
  <div class="usesr-sex">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { getUpdateProfileAPI } from '@/api'
export default {
  name: 'UserSex',
  props: {
    sex: Number
  },
  data () {
    return {
      columns: ['男', '女'],
      value: this.sex
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '正在保存...',
        forbidClick: true,
        duration: 0
      })
      try {
        await getUpdateProfileAPI({
          gender: this.value
        })
        this.$toast.success('修改成功')
        this.$emit('close')
        this.$emit('update:sex', this.value)
        this.value = ''
      } catch (err) {
        this.$toast.fail('保存失败')
        console.log('err', err.message)
      }
    },
    onChange () {
      this.value = arguments[2]
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
</style>
