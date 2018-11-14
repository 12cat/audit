<template>
  <div class="layout" v-loading="$store.state.review.loading">
      <top></top>
      <div class="content">
        <div class="crumbs">
          <span>当前位置：</span>
          {{ crumbsName1 }} / {{ crumbsName2 }}
        </div>
        <div class="cont-menu">
          <el-menu :default-active="menu_active">
            <el-submenu v-for="item in menuList" :key="item.path" :index="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span v-text="item.text"></span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="e in item.submenu" :key="e.path" :index="e.id" v-text="e.text" @click="toLink(e, item)"></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div class="cont-view">
          <el-main>
              <slot></slot>
          </el-main>
        </div>
      </div>
  </div>
</template>

<script>
import top from './top'

export default {
  name: 'layout',
  data () {
    return {
      menu_active: '',
      crumbsName1: '',
      crumbsName2: '',
      menuList: []
    }
  },
  mounted () {
    let self = this
    let _path = '/' + location.hash
    // 接口调用，获取系统菜单列表
    this.menuList = [
      {
        id: '1',
        icon: 'el-icon-document',
        text: '内容审核',
        submenu: [
          {id: '11', pId: '1', text: '复审', path: '/#/review'},
          {id: '12', pId: '1', text: '抽审-抽奖', path: '/#/review1'},
          {id: '13', pId: '1', text: '抽审-咖啡馆', path: '/#/review2'}
        ]
      },
      {
        id: '2',
        icon: 'el-icon-setting',
        text: '系统设置',
        submenu: [
          {id: '21', pId: '2', text: '系统设置1', path: '/#/setting'},
          {id: '22', pId: '2', text: '系统设置2', path: '/#/setting1'}
        ]
      }
    ]
    // 获取当前页面菜单位置
    this.menuList.forEach(e1 => {
      e1.submenu.forEach(e2 => {
        if (e2.path === _path) {
          self.menu_active = e2.id
          self.crumbsName1 = e1.text
          self.crumbsName2 = e2.text
        }
      })
    })
  },
  methods: {
    toLink (e, p) {
      this.crumbsName1 = p.text
      this.crumbsName2 = e.text
      this.$store.state.review.run()
      // window.location = e.path
    }
  },
  components: {
    top
  }
}
</script>

<style scoped>
  .layout {
    height: 100%;
  }
  .content {
    height: 100%;
  }
  .content .cont-menu {
    position: fixed;
    top: 45px;
    left: -20px;
    width: 185px;
    height: 100%;
    padding: 0 10px;
    box-shadow: 1px 0 5px #eee;
    background-color: #fff;
    z-index: 1999;
  }
  .content .el-menu {
    margin-top: 20px;
    border: 0;
  }
  .content .crumbs {
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
    height: 53px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 53px;
    padding-left: 215px;
    background-color: #fff;
    z-index: 1998;
    box-shadow: 2px 0 5px #eee;
  }
  .content .crumbs span {
    color: #bbb;
  }
  .content .cont-view {
    width: 100%;
    min-width: 1200px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 98px 0 0 185px;
    background-color: #f4f4f4;
  }
  .el-submenu .el-menu-item {
    min-width: 0;
  }
</style>
