<template>
  <div class="container">
    <h1>ホーム</h1>
    <p>{{ message }}</p>
    <p>{{email}}</p>
    <p>{{user}}</p>
    <NuxtLink to="/register">新規登録</NuxtLink>
    <br />
    <NuxtLink to="/login">ログイン</NuxtLink>
    <br />
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      message: 'ログインができておりません',
      email: null,
      user: null,
      contents: [],
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = 'ログイン済みです'
        this.email = user.email
        this.user = user.displayName
      }
    })
  },
  methods: {
    async getContact() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/rest"
      );
      this.contactLists = resData.data.data;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/')
        })
    },
    
  },
}
</script>