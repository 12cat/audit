<template>
  <div class="top">
    <ul class="left">
      <li><a class="logo" href="/"></a></li>
      <li><span class="title" v-text="title"></span></li>
    </ul>
    <ul class="right">
      <li v-if="local_user_img"><img :src="local_user_img" alt=""></li>
      <li v-else><img src="../../assets/image/user.png" alt=""></li>
      <li><span class="userName" v-text="local_user_name"></span></li>
      <li><button @click="logout">退出</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      title: '必要内容审核系统'
    }
  },
  created () {
    this.local_user_img = this.local_user_img || localStorage.getItem('local_user_img')
    this.local_user_name = this.local_user_name || localStorage.getItem('local_user_name')
  },
  methods: {
    logout () {
      window.location = '/#/login'
      localStorage.setItem('local_user_img', null)
      localStorage.setItem('local_user_name', null)
      this.local_user_img = undefined
      this.local_user_name = undefined
      this.$service.login.logout().then(res => {
        window.location = 'http://cms.biyao.com/index.html'
      })
    }
  }
}
</script>

<style scoped>
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  color: #fff;
  background-color: #4c91d0;
  z-index: 1999;
}
.top li {
  float: left;
}
.top .logo {
  display: inline-block;
  width: 153px;
  height: 33px;
  background: url('../../assets/image/logo.png') no-repeat center;
  margin-top: 10px;
  margin-left: 15px;
}
.top .title {
  display: inline-block;
  margin-left: 8px;
  padding-left: 8px;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  border-left: 1px solid #f2f2f2;
}
.top button {
  display: inline-block;
  width: 78px;
  height: 28px;
  margin-right: 30px;
  border: 1px solid #f2f2f2;
  background-color: #4c91d0;
  font-size: 14px;
  line-height: 28px;
  color: #fff;
  cursor: pointer;
}
.top .userName {
  margin-right: 30px;
  font-size: 14px;
  line-height: 45px;
}
.top img {
  margin-top: 10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
