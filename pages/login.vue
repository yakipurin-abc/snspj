<template>
  <validation-observer ref="obs" v-slot="ObserverProps">
    <div class="header">
      <Header></Header>
    </div>
    <div class="login">
      <div class="content">
        <h2>ログイン</h2>
        <br />
        <form @submit.prevent="login">
          <validation-provider v-slot="{ errors }" rules="required">
            <input v-model="email" id="email" class="txt" type="email" placeholder="メールアドレス"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <br />
          <validation-provider v-slot="{ errors }" rules="required">
            <input v-model="password" id="password" class="txt" type="password" placeholder="パスワード"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <br />
          <button @click="login" class="btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
        </form>
      </div>
    </div>
  </validation-observer>
</template>

<script>
import firebase from '~/plugins/firebase'
import Header from "@/components/header.vue";
export default {
	components: {
		Header
	},
  data(){
    return{
      email: null,
      password:null,
    };
  },
  methods: {
  login() {
    if (!this.email || !this.password) {
      alert('メールアドレスまたはパスワードが入力されていません。')
      return
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('ログインが完了しました')
        this.$router.push('home')
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います。')
            break
          case 'auth/user-disabled':
            alert('ユーザーが無効になっています。')
            break
          case 'auth/user-not-found':
            alert('ユーザーが存在しません。')
            break
          case 'auth/wrong-password':
            alert('パスワードが間違っております。')
            break
          default:
            alert('エラーが起きました。しばらくしてから再度お試しください。')
            break
        }
      })
    },
  },
};
</script>
<style scoped>
.login{
  background-color: rgb(23, 35, 49);
  height: 100vh;
  width: 100vw;
  position: relative;
  }
.content{
  background-color: #fff;
  width: 33%;
  height: 40%;
  padding: 20px;
  position: absolute;
  top: 20%;
  left: 33%;
  text-align: center;
  border-radius: 30px;
}
.txt{
  width: 80%;
  height: 10%;
}
.btn{
  color: #fff;
  background-color: rgb(96, 26, 224);
  padding: 5px 8px;
  border-radius: 30px;
}

</style>