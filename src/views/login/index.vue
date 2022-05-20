<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="ithei ithei-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
         type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="ithei ithei-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
          native-type="button"
          class="send-sms-btn"
          round
          size="small"
          type="default"
          @click="onSendSms"
          v-else
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, getSmsCodeAPI } from '@/api'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '请输入手机号'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '请输入验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await loginAPI(user)
        console.log('登录成功', res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登陆成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('请求错误')
        }
        console.log('err', err)
      }
    },
    async onSendSms () {
      console.log('onSendSms')
      try {
        await this.$refs.form.validate('mobile')
      } catch (err) {
        console.log('err', err)
        return
      }
      this.isCountDownShow = true
      try {
        const res = await getSmsCodeAPI(this.user.mobile)
        console.log(res)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .ithei {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 148px;
    height: 50px;
    font-size: 22px;
    line-height: 50px;
    background-color: #ededed;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px  33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
