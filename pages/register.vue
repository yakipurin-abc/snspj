<template>
  <validation-observer ref="obs" v-slot="ObserverProps">
    <div class="header">
      <Header></Header>
    </div>
    <div class="register">
      <div class="register-content">
        <h2>新規登録</h2>
          <validation-provider v-slot="{ errors }" rules="required|max:20">
            <input v-model="name" id="name" class="txt" type="name" placeholder="ユーザーネーム"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <br />
          <validation-provider v-slot="{ errors }" rules="required|email">
            <input v-model="email" id="email" class="txt" type="email" placeholder="メールアドレス"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <br />
          <validation-provider v-slot="{ errors }" rules="required|min:6">
            <input v-model="password" id="password" class="txt" type="password" placeholder="パスワード"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <br />
          <button @click="register" class="register-btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
      </div>
    </div>
  </validation-observer>
</template>
<script>
import Header from "@/components/header.vue";
import firebase from '~/plugins/firebase'
export default {
  components: {
			Header
  },
  data() {
    return {
      email: null,
      password: null,
      name: null,
    }
  },
  methods: {
    register() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((data)=>{
        console.log(data);
        const sendData ={
          id: data.user.uid,
          name: this.name
        }
        console.log(sendData);
        data.user.updateProfile({
        displayName: this.name,
        })
        this.$axios.post("http://localhost:8000/api/v1/user", sendData)
        this.$router.push('login')
      });
    }
  },
}
</script>

<style scoped>
.register{
  background-color: rgb(23, 35, 49);
  height: 100vh;
  width: 100vw;
  position: relative;
  }
.register-content{
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
.register-btn{
  color: #fff;
  background-color: rgb(96, 26, 224);
  padding: 5px 8px;
  border-radius: 30px;
}
</style>