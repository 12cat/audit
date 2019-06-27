<template>
  <div class="model">
    <el-card>
      <tabs v-model="acitveKey">
        <pane label="标签一" name="1">标签一内容</pane>
        <pane label="标签二" name="2">标签二内容</pane>
        <pane label="标签三" name="3">标签三内容</pane>
      </tabs>
    </el-card>
  </div>
</template>

<script>
import tabs from './tabs'
import pane from './pane'

export default {
  name: 'model',
  data () {
    return {
      acitveKey: '1'
    }
  },
  components: {tabs, pane}
}
</script>

<style scoped>
.model {
  padding: 50px;
}
</style>
