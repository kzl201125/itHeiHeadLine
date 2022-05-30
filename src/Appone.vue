<template>
  <div>
    <myVue :count.sync="count"></myVue>
  </div>
</template>

<script>
import myVue from './components/my.vue'
export default {
  data () {
    return {
      count: 0
    }
  },
  components: {
    myVue
  }
}
</script>

<style></style>
