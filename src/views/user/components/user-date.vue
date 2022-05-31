<template>
  <div class="user-date">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onconfirm"
    />
  </div>
</template>

<script>
import { getUpdateProfileAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'userDate',
  props: {
    year: String
  },
  data () {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2050, 11, 31),
      currentDate: new Date(this.year)
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onconfirm () {
      this.$toast.loading({
        message: '正在保存...',
        forbidClick: true,
        duration: 0
      })
      try {
        const currentTime = dayjs(this.currentDate).format('YYYY-MM-DD')
        await getUpdateProfileAPI({
          birthday: currentTime
        })
        this.$toast.success('修改成功')
        this.$emit('close')
        this.$emit('update:year', currentTime)
        this.value = ''
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

<style scoped>
</style>
