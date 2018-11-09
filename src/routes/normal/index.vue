<template>
  <div id="normal">
    <layout>
      <transition name="el-fade-in-linear">
        <router-view />
      </transition>
    </layout>
  </div>
</template>

<script>
import layout from '@/components/layout'

export default {
  name: 'normal',
  components: {
    layout
  }
}
</script>

<style scoped>

</style>
