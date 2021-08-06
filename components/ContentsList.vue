<template>
  <div class="contents-list">
    <div class="logo">
      <img src="~/assets/logo.png">
    </div>
    <nav class="nav">
      <ul class="menu-group">
        <li class="menu-item">
          <NuxtLink to="/home" class="home-btn">ホーム</NuxtLink>
        </li>
        <li class="menu-item">
          <a @click="logout" class="logout">Logout</a>
        </li>
      </ul>
    </nav>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="share">
          <p>シェア</p>
          <validation-provider v-slot="{ errors }" rules="required">
            <textarea name="message" id="message" v-model="message" cols="30" rows="10" class="message-box" required></textarea>
            <div class="error">{{ errors[0] }}</div>
            <button @click="insertMessage" type="submit" class="btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">シェアする</button>
          </validation-provider>
        </div>
      </validation-observer>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  data(){
      return{
        message: null,
        name: null,
      };
    },
  methods: {
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
};
</script>

<style scoped>
.contents-list{
  background-color: rgb(23, 35, 49);
}
li{
  list-style: none;
}
.home-btn{
  text-decoration: none;
  color: #fff;
  display: block;
}
.logo img{
  width: 100px;
  padding-top: 2%;
  padding-left: 1%;
}
.logout{
  cursor: pointer;
  color: #fff;
}
.message{
  color: #fff;
  padding: 15px;
}
textarea {
  background-color: rgb(23, 35, 49);
  border: solid #fff 3px;
  resize: none;
  border-radius: 5px;
  color: #fff;
}
.home-btn::before{
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  background: url(~/assets//home.png) no-repeat;
  background-size: contain;
  margin-right: 15px;
}
.logout::before{
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  background: url(~/assets//logout.png) no-repeat;
  background-size: contain;
  margin-right: 15px;
}
.btn{
  color: #fff;
  background-color: rgb(96, 26, 224);
  padding: 5px 8px;
  border-radius: 30px;
  margin-left: 150px;
  width: 40%;
}
.share{
  margin-left: 30px;
}
.share p {
  color: #fff;
}

</style>