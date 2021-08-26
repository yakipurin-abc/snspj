<template>
  <div class="home">
		<div class="side-list">
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
		</div>
		<div class="contents">
			<h2 class="contents-ttl">ホーム</h2>
			<div class="contents-item" v-for="item in contents" :key="item.id">
				<div class="top-line">
					<p>{{item.user}}</p>
					<img v-if="likeStatus.isLike == false" src="~/assets/heart.png"  @click.prevent="like(item.id)">
					<img v-else src="~/assets/heart.png" @click.prevent="unlike(item.id)"  class="unlike-img">
					<p>{{item.count}}</p>
					<img @click="deleteContent(item.id)" src="~/assets/cross.png">
					<div  class="contents-dtl">
						<NuxtLink :to="{ name: 'detail-id', params:{id: item.id}}" >
							<img  src="~/assets/detail.png">
						</NuxtLink>
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
				user: '',
				message: '',
				email: '',
				status: '',
				user_id: '',
				count: '',
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
        	user_id: this.user_id,
					user: this.user
      	};
				console.log(this.user)
      	await this.$axios.post("http://127.0.0.1:8000/api/v1/rest", sendData);
				this.getContent();
    	},
			async getContent() {
      	const resData = await this.$axios.get(
      	  "http://127.0.0.1:8000/api/v1/rest/"
      	);
				console.log(resData);
				console.log('レスデータ');
      	this.contents = resData.data.data;
				console.log(this.contents);
				console.log('コンテンツ');
				this.message_id = resData.id;
				this.like_check();
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
  			});
			},

			async like_check(){
				const resLikeInfo = await this.$axios.request({
  			method: 'get',
  			url: 'http://127.0.0.1:8000/api/v1/like/' + this.user_id,
  			params: {user_id: this.user_id},
				});
				console.log(resLikeInfo);
				console.log('ライクインフォ');
				this.likeStatus = resLikeInfo.data.data
				console.log(this.likeStatus);
				console.log("ライクステータス");
			},
			async like(id) {
      	const addLike = {
        	user_id: this.user_id,
					rest_id: id,
      	};
      	await this.$axios.post("http://127.0.0.1:8000/api/v1/like", addLike);
				this.$router.push('home')
				this.getContent();
    	},
			async unlike(id) {
				await this.$axios.request({
  				method: 'delete',
  				url: 'http://127.0.0.1:8000/api/v1/like/{like}',
  				data: {user_id: this.user_id,  rest_id: id},
				});
				this.getContent();
    	},
			async getCount() {
      	const resCount = await this.$axios.get(
      	  "http://127.0.0.1:8000/api/v1/like"
      	);
      	this.count = resCount.data.count;
    	},
		},
		created() {
			this.certification();
			this.getContent();
			this.getCount();
			this.like_check();
		}
	};
</script>

<style scoped>
.home{
	background-color: rgb(23, 35, 49);
	display: flex;
	color: #fff;
	width: 100%;
	height: 100%;
}
.contents-list img{
	width: 2%;
}
.side-list{
  width: 20%;
}
.contents{
	margin-left: 3%;
	width: 100%;
	height: 100vh;
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
  width: 50%;
  margin-left: 5%;
  margin-top: 5%;
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
	width: 100%;
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
  float: right;
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

.unlike-img{
	filter: invert(70%) sepia(50%) saturate(6000%) hue-rotate(290deg) brightness(60%) contrast(112%);
}
</style>