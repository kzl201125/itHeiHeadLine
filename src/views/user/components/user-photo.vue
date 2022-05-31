<template>
  <div class="user-photo">
    <img :src="photo" alt="" id="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="finish" @click="finish">完成</div>
    </div>
  </div>
</template>

<script>
import { getUpdatePhotoProfileAPI } from '@/api'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'userPhoto',
  props: {
    photo: {
      type: String
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  components: {},
  created () {},
  mounted () {
    const image = document.getElementById('img')
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 16 / 10, // 裁剪区默认正方形
      autoCropArea: 0.6, // 自动调整裁剪图片
      // cropBoxMovable: false, // 禁止裁剪区移动
      // cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
      //      aspectRatio: 16 / 9,
      // crop(event) {
      //   console.log(event.detail.x);
      //   console.log(event.detail.y);
      //   console.log(event.detail.width);
      //   console.log(event.detail.height);
      //   console.log(event.detail.rotate);
      //   console.log(event.detail.scaleX);
      //   console.log(event.detail.scaleY);
      // },
    })
    console.log('cropper', this.cropper)
  },
  methods: {
    finish () {
      this.cropper.getCroppedCanvas().toBlob(
        async (blob) => {
          const formData = new FormData()
          console.log(this.cropper)
          // console.log('for1', formData)
          formData.append('photo', blob /*, 'example.png' */)
          // console.log('for2', formData)
          try {
            const res = await getUpdatePhotoProfileAPI(formData)
            console.log('res', res)
            this.$emit('close')
            this.$emit('update:photo', res.data.data.photo)
          } catch (err) {
            console.log('err', err.message)
          }
        } /*, 'image/png' */
      )
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.user-photo {
  background-color: rgba(0, 0, 0, 0.8);
  height: 100%;
  img {
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .finish {
      width: 80px;
      height: 80px;
      font-size: 30px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
    }
  }
}
</style>
