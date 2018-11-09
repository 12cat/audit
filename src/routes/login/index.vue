<template>
  <div>
    <div class="login-background"></div>
    <div class="login-box">
      <div class="logo"></div>
      <div class="title">欢迎来到 必要内容审核系统</div>
      <div class="form">
        <p class="label user"><input type="text" placeholder="请输入用户名" v-model="param.userName"></p>
        <p class="label pswd"><input type="text" placeholder="请输入密码" v-model="param.password"></p>
        <button @click="login">登录</button>
        <p class="error">用户名或密码错误</p>
      </div>
    </div>
    <div id="qrcodeDivBox">
      <div class="qrcode-background"></div>
      <div class="qrcode-content">
        <div class="qrcode-top">
          <div class="qrcodeDiv" id="qrcodeDiv"></div>
        </div>
        <div class="qrcode-btm"><span id="qrcodeHide"></span></div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      param: {
        userName: '',
        password: '',
        deviceId: '',
        rid: ''
      },
      pageIndex: '/#/review'
    }
  },
  mounted () {
    window._smConf = {
      organization: 'thP0Unz5GHRLEHSmf4Ja',
      staticHost: 'static.fengkongcloud.com'
    }
    var url = (function () {
      var originHost = 'static2.fengkongcloud.com'
      var isHttps = document.location.protocol === 'https:'
      var protocol = isHttps ? 'https://' : 'http://'
      var fpJsPath = '/fpv2.js'
      var url = protocol + window._smConf.staticHost + fpJsPath
      var ua = navigator.userAgent.toLowerCase()
      var isWinXP = /windows\s(?:nt\s5.1)|(?:xp)/.test(ua)
      var isLowIE = /msie\s[678]\.0/.test(ua)
      if (isHttps && isWinXP && isLowIE) {
        url = protocol + originHost + fpJsPath
      }
      return url
    })()
    var sm = document.createElement('script')
    var s = document.getElementsByTagName('script')[0]
    sm.src = url
    s.parentNode.insertBefore(sm, s)
  },
  methods: {
    login () {
      let self = this
      document.getElementById('qrcodeDivBox').style.display = 'block'
      window.initSMCaptcha({
        organization: 'thP0Unz5GHRLEHSmf4Ja',
        appId: 'qrcode',
        appendTo: 'qrcodeDiv',
        customData: {
          deviceId: window.SMSdk.getDeviceId()
        }
      }, function (SMCaptcha) {
        SMCaptcha.onSuccess(function (data) {
          if (data.pass) {
            document.getElementById('qrcodeDivBox').style.display = 'none'
            self.param.deviceId = window.SMSdk.getDeviceId()
            self.param.rid = data.rid
            // 登录请求
            self.$service.login.login(self.param).then(res => {
              if (res.success === 1) {
                self.local_user_img = localStorage.setItem('local_user_img', 'http://img2.imgtn.bdimg.com/it/u=790965091,2800442173&fm=200&gp=0.jpg')
                self.local_user_name = localStorage.setItem('local_user_name', '你好! zoe')
                window.location = self.pageIndex
              } else {
                self.$message.error(res.data.error.message)
              }
            })
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  .login-background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: black url('../../assets/image/background.png') no-repeat center fixed;
    background-size: 100% 100%;
  }
  .login-box {
    width: 360px;
    height: 400px;
    position: absolute;
    background-color: white;
    margin-top: -200px;
    top: 50%;
    right: 14.6%;
    text-align: center;
  }
  .login-box .logo {
    display: inline-block;
    margin-top: 40px;
    width: 201px;
    height: 44px;
    background: url('../../assets/image/logo_login.png') no-repeat center;
  }
  .login-box .title {
    font-size: 12px;
    color: #333;
    line-height: 44px;
  }
  .login-box .form {
    margin-top: 10px;
  }
  .login-box .label {
    position: relative;
    display: inline-block;
    width: 260px;
    height: 40px;
    padding-top: 20px;
    border-bottom: 1px solid #eee;
  }
  .login-box .label::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 10px;
    left: 0;
    background: url('../../assets/image/icon_user.png') no-repeat center;
  }
  .login-box .label.pswd::after {
    background: url('../../assets/image/icon_pswd.png') no-repeat center;
  }
  .login-box .label input {
    font-size: 14px;
    color: #333;
    line-height: 40px;
    border: none;
    width: 200px;
  }
  .login-box button {
    width: 260px;
    height: 40px;
    margin-top: 50px;
    border-radius: 2px;
    border: none;
    background-color: #4c91d0;
    line-height: 40px;
    font-size: 14px;
    color: white;
    cursor: pointer;
  }
  .login-box button:hover {
    background-color: #66b1ff;
  }
  .login-box .error {
    font-size: 12px;
    color: #e83e17;
    line-height: 30px;
    text-align: center;
  }
  #qrcodeDivBox {
    width: 350px;
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -175px;
    display: none;
  }
</style>
