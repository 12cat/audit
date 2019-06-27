<template>
  <div class="tabs">
    <div class="tabs-bar">
      <div
        :class="tabCls(item)"
        v-for="(item, index) in navList" :key="index"
        @click="handleChange(index)"
        v-text="item.label"></div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      currentValue: this.value,
      navList: []
    }
  },
  methods: {
    tabCls (item) {
      return [
        'tabs-tab',
        {'tabs-tab-active': item.name === this.currentValue}
      ]
    },
    getTabs () {
      return this.$children.filter(item => {
        return item.$options.name === 'pane'
      })
    },
    updateNav () {
      this.navList = []
      this.getTabs().forEach((pane, index) => {
        this.navList.push({label: pane.label, name: pane.name || index})
        if (!pane.name) pane.name = index
        index === 0 && !this.currentValue && (this.currentValue = pane.name || index)
      })
      this.updateStatus()
    },
    updateStatus () {
      let tabs = this.getTabs()
      tabs.forEach(tab => {
        tab.show = tab.name === this.currentValue
      })
    },
    handleChange (index) {
      let nav = this.navList[index]
      let name = nav.name
      this.currentValue = name
      this.$emit('inptu', name)
      this.$emit('on-click', name)
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue () {
      this.updateStatus()
    }
  }
}
</script>

<style scoped>
.tabs-tab {
  padding: 5px;
  margin-right: 5px;
  display: inline-block;
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
}
.tabs-tab.tabs-tab-active {
  background-color: #e3e3e3;
}
.tabs-content {
  padding: 5px;
  margin-top: 10px;
  border: 1px solid #e3e3e3;
  border-radius: 3px;
}
</style>
