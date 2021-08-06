<template>
<div class="detail">
  <div class="side-list">
			<div class="contents-list">
    		<div class="logo">
      		<img src="~/assets/logo.png">
    		</div>
    		<nav class="nav">
      		<p>{{user}}</p>
      		<p>{{email}}</p>
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
	</div>

  <div class="comment">
    <div class="comment-ttl">
      <p>コメント</p>
    </div>
    <div class="comment-list">

    </div>


  </div>
</div>
  
</template>
<script>
import firebase from '~/plugins/firebase'
	export default {
		data() {
			return{
				contents:[],
				user: null,
				message: null,
				email: null,
			}
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
			detail(){
				this.$router.replace('detail')
			},
		async insertMessage() {
      const sendData = {
        message: this.message,
        user: this.user
      };
      await this.$axios.post("http://127.0.0.1:8000/api/v1/rest", sendData);
			this.$router.replace('home')
    },
		async getContent() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/rest/"
      );
      this.contents = resData.data.data;
    },
    async deleteContent(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/rest/" + id);
      this.getContent();
    },
	},
	created() {
  	firebase.auth().onAuthStateChanged((user) => {
    	if (user) {
      	this.email = user.email
      	this.user = user.displayName
    	}
  	})
  },
};

</script>
<style scoped>
.side-list{
  width: 25%;
  background-color: rgb(23, 35, 49);
}
.comment{
  width: 100%;
  background-color: rgb(23, 35, 49);
}
.detail{
  color: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
}
.contents-list{
  padding-left: 30px;
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
  width: 100px;
}
.share{
  margin-left: 30px;
}
.share p {
  color: #fff;
}

.comment-ttl{
  border-left: solid 1px #fff;
  border-bottom: solid 1px #fff;
  margin-top: 0;
  margin-bottom: 0;
}
.comment-ttl p{
  margin-top: 0;
  padding: 10px;
}
.comment-list{
  border-left: solid 1px #fff;
  border-bottom: solid 1px #fff;
  margin-top: 0;
  margin-bottom: 0;
}
</style>