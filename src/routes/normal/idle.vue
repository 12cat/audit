<template>
  <div>
    <el-card class="box-card">
      <h1>title：{{ title }}</h1>
      <ul>
        <li v-for="e in data.products" :key="e.image" v-text="e.image"></li>
      </ul>
    </el-card>
    <el-card class="box-card">
      <table class="mytable">
        <tr v-for="(sub, index) in tableData" :key="index">
          <td :class="{'hoverStyle':index==tabTrIndex && i==tabTdIndex }"
              v-for="(item, i) in sub.sub" :key="i"
              @mouseover="tabTrIndex=index; tabTdIndex=i"
              @mouseout="tabTrIndex=tabTdIndex=-1">
            {{ item.text }}
            <span v-text="item.title"></span>
          </td>
        </tr>
      </table>
    </el-card>
    <el-card>
      <p>
        <button @click="checkModular">调用子组件方法</button>
        &nbsp;
        <button @click="loading">loading</button>
        &nbsp;
        <button @click="$store.state.review.run()">store.state</button>
        &nbsp;
        {{ storeStr }}
      </p>
    </el-card>
    <el-card>
      <!-- 如果定义的模块名为MyModular，使用的标签为<my-modular> -->
      <modular ref="modular" @parentFun="parentFun" :num="12" :str="title" :bln="true" :obj="{name:'12cat'}" :arr="[4, 5, 6]" :fun="myFun"></modular>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'IDLE',
			list: []
    }
  },
  // 渲染html，生成dom之前
  created () {
    console.log('created is run')
  },
  // 渲染html，生成dom之后
  mounted () {
    console.log('mounted is run')
    this.$service.setting.getList(this.param).then(res => {
      this.data = res.data.data
    })

    // vuex
    this.$store.state.review.text = 'setting'
    this.$store.state.review.run = () => {
      this.storeStr = '1'
    }
  },
  components: {modular},
  methods: {
    myFun (t) {
      this.$message.success('myFun ' + t)
    },
    checkModular () {
      // 调用子组件方法，前提先声明 ref="modular"
      this.$refs.modular.modularFun()
      this.title = 'setting'
    },
    parentFun (str) {
      this.$message.success('parentFun is run ' + str)
      this.title = str
    },
    loading () {
      this.$store.commit('starLoading')
      setTimeout(() => {
        this.$store.commit('stopLoading')
      }, 2000)
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 24px;
    color: red;
  }
  button {
    padding: 5px 20px;
    background-color: blue;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  }
  .mytable td {
    position: relative;
    cursor: pointer;
  }
  .mytable td span {
    display: none;
  }
  .mytable .hoverStyle span {
    position: absolute;
    padding: 3px;
    border: 1px solid red;
    border-radius: 3px;
    background-color: #fff;
    top: 40px;
    left: 0;
    display: block;
    z-index: 100;
  }
</style>
