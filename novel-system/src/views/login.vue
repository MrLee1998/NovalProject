<template>
  <div class="login-box">
    <div class="container">
      <div class="login-item">
        <div class="avatar">
          <img :src="avatar" alt="" />
        </div>
        <van-form>
          <!-- @submit="onSubmit" -->
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field v-show="isRegister" name="rePassword"
           type="password" v-model="rePassword" label="重复密码" 
           placeholder="请再次输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
          <div style="margin: 16px" @click="userHandle">
            <van-button round block type="info" native-type="submit"
              >{{isRegister ? '注册' : '登录'}}</van-button
            >
          </div>
        </van-form>
      </div>
      <div class="register" @click="register">
        <p>{{isRegister ? '已有账号,点击登录' : '新用户？ 点击这里注册' }}</p>
      </div>
      <div class="skipLogin" @click="skip">
        <p>试读一下？ 点击试读</p>
      </div>
    </div>
  </div>
</template>

<script>
import { setLocal } from '../common/utils'

export default {
  data() {
    return {
      avatar: require('../assets/images/7.jpg'),
      username: '',
      password: '',
      rePassword: '',
      isRegister: false
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      if(!this.isRegister) {
        this.$http.login({
          username: this.username,
          password: this.password
        }).then( res => {
          console.log(res);
          if(res.code === 1) {
            this.$toast.success(res.msg)
            setLocal('userId', res.data.userId)
            this.$router.push({
              path: '/bookStack',
              params: {
                id: res.data.userId
              }
            })
          }
          
        })
      } else {
        if(this.rePassword !== this.password) {
          this.$toast.fail('两次密码输入不一致!')
          return
        }
        this.$http.register({
          username: this.username,
          password: this.password
        }).then(res => {
          console.log(res);
          this.$toast.success('注册成功!')
          this.isRegister = false
        })
      }
    },
    userHandle() {
      this.onSubmit()
    },
    skip() {
      this.$router.push('/recommend')
    },
    register() {
      this.isRegister = !this.isRegister
    }
  },
};
</script>

<style lang="less" scoped>
.login-box {
  .container { 
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login-item {
      .avatar {
        text-align: center;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      padding-top: 130px;
      .van-field {
        width: 280px;
        margin: 10px;
        border-radius: 5px;
      }
    }
    .register {
      position: fixed;
      bottom: 20px;
      left: 20px;
      opacity: 0.3;
      // color: rgb(65, 15, 71);
      color: red;
      font-size: 14px;
      text-align: center;
      font-family: Arial;
    }
    .skipLogin {
      position: fixed;
      bottom: 20px;
      right: 20px;
      opacity: 0.3;
      color: rgb(35, 15, 71);
      font-size: 14px;
      text-align: center;
      font-family: Arial;
    }
  }
}
</style>