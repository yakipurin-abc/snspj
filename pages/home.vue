<template>
  <div class="home">
		<div class="side-list">
			<div class="contents-list">
    		<div class="logo">
      		<img src="~/assets/logo.png">
    		</div>
    		<nav class="nav">
      		<p>{{user}}</p>
      		<p>{{email}}</p>
					<p>{{user_id}}</p>
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
		<div class="contents">
			<h2 class="contents-ttl">ホーム</h2>
			<div class="contents-item" v-for="item in contents" :key="item.id">
				<div class="top-line">
					<p>{{item.user}}</p>
					<p>{{item.id}}</p>
					<img  src="~/assets/heart.png"  @click.prevent="like(item.id)">
					<img  src="~/assets/heart.png" >
					<p>count</p>
					<img @click="deleteContent(item.id)" src="~/assets/cross.png">
					<div  class="contents-dtl">
						<img src="~/assets/detail.png">
					</div>
				</div>
				<p class="item-msg">{{item.message}}</p>
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
				status: false,
				user_id: null,
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
			async insertMessage() {
      	const sendData = {
        	message: this.message,
        	user: this.user
      	};
      	await this.$axios.post("http://127.0.0.1:8000/api/v1/rest", sendData);
				this.$router.push('home')
    	},
			async getContent() {
      	const resData = await this.$axios.get(
      	  "http://127.0.0.1:8000/api/v1/rest/"
      	);
      	this.contents = resData.data.data;
				this.message_id = resData.id
    	},
    	async deleteContent(id) {
      	await this.$axios.delete("http://127.0.0.1:8000/api/v1/rest/" + id);
      	this.getContent();
    	},
			certification(){
				firebase.auth().onAuthStateChanged((user) => {
    			if (user) {
    	  		this.email = user.email
    	  		this.user = user.displayName
						this.user_id = user.uid
    			}
  			})
			},
			async like(id) {
      	const addLike = {
        	message_id: '4',
        	user_id: '4',
      	};
      	await this.$axios.post("http://127.0.0.1:8000/api/v1/like", addLike);
				this.$router.push('home')
    	},
		},
		created(){
			this.certification();
			this.getContent();
			this.like();
		}
	}


</script>

<style scoped>
.home{
	background-color: rgb(23, 35, 49);
	display: flex;
	color: #fff;
	width: 100%;
	height: 100vh;
}
.contents-list img{
	width: 2%;
}

.contents{
	margin-left: 3%;
	width: 100%;
	height: 100%;
}
.contents-ttl{
	padding: 10px;
	border-bottom: solid 2px #fff;
	border-left: solid 2px #fff;
	width: 100%;
	margin-top: 0;
	margin-bottom: 0;
}
li{
  list-style: none;
}
.item{
	width: 100%;
}
table{
	width: 100%;
}
.contents-list{
  background-color: rgb(23, 35, 49);
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
.top-line img{
	width: 15px;
	height: 15px;
  margin: auto 8px;
}
.contents-dtl img{
	margin-left: 30px;
	margin-top: 20px;
}
.top-line{
	display: flex;
}
.contents-item{
	border-bottom: solid 2px #fff;
	border-left: solid 2px #fff;
	padding-left: 20px;
}
</style>