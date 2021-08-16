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
          <p>{{paramsId}}</p>
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
      <div class="contents-item">
				<div class="top-line">
					<p>{{paramsUser}}</p>
					<img  src="~/assets/heart.png"  @click.prevent="like(paramsId)">
					<img  src="~/assets/heart.png" >
					<img @click="deleteContent(paramsId)" src="~/assets/cross.png">
				</div>
				<p class="item-msg">{{paramsMessage}}</p>
		  </div>
      <div class="comment-center">
        <p>コメント</p>
        <div v-for="item in data" :key="item.id"></div>
        <p>{{item}}</p>
      </div>
      <div class="comment-item">
        <p>a</p>
        <p>x</p>
      </div>
    </div>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <div class="comment-form">
        <validation-provider v-slot="{ errors }" rules="required">
          <textarea name="comment" id="comment" v-model="comment" cols="120" rows="2" class="comment-box" required></textarea>
          <div class="error">{{ errors[0] }}</div>
          <button @click="insertComment" type="submit" class="btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">コメント</button>
        </validation-provider>
      </div>
    </validation-observer>


  </div>
</div>
</template>
<script>
import firebase from '~/plugins/firebase'
	export default {
		data() {
			return{
        comment: null,
				user: null,
				message: null,
				email: null,
        paramsUser: null,
        paramsMessage: null,
        paramsId: null,
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
			async like(id) {
      	const addLike = {
        	message_id: id,
        	user_id: this.user_id,
      	};
      	await this.$axios.post("http://127.0.0.1:8000/api/v1/like", addLike);
				this.$router.push('home')
    	},
		async insertMessage() {
      const sendData = {
        message: this.message,
        user: this.user
      };
      await this.$axios.post("http://127.0.0.1:8000/api/v1/rest", sendData);
			this.$router.replace('/home')
    },
    async deleteContent(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/rest/" + id);
      this.$router.replace('/home')
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
    setParams(){
      this.paramsUser = this.$route.params.user || ''
      this.paramsMessage = this.$route.params.message || ''
      this.paramsId = this.$route.params.id || ''
    },
    async insertComment() {
      const sendComment = {
        comment: this.comment,
        user: this.user,
        message_id: this.paramsId
      };
      await this.$axios.post("http://127.0.0.1:8000/api/v1/comment", sendComment);
			this.$router.go({ name: 'detail-user-message-_id' })
    },
    async getContent(paramsId) {
      const resComment = await this.$axios.get(
      	"http://127.0.0.1:8000/api/v1/search/" + paramsId
      );
      this.data = resComment
    	},
	},
	created() {
  	this.certification();
    this.setParams();

  },
};

</script>
<style scoped>
.comment{
  margin-left: 3%;
	width: 100%;
	height: 100vh;
}
.detail{
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
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
  float: right;
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
  font-weight: bold;
  font-size: 20px;
  padding-left: 10px;
}
.comment-ttl p{
  margin-top: 0;
  padding: 10px;
}
.comment-list{
  border-left: solid 1px #fff;
  margin-top: 0;
  margin-bottom: 0;
}
.top-line{
	display: flex;
}
.contents-item{
	border-bottom: solid 2px #fff;

	padding-left: 20px;
}
.contents-item p{
  font-weight: bold;
}
.top-line img{
	width: 15px;
	height: 15px;
  margin: auto 8px;
  color: rgb(138, 26, 26);
}
.comment-box{
  margin-top: 20px;
  width: 95%;
  height: 30px;
  border: solid 1px #fff;
}
.comment-center{
  border-bottom: solid 1px #fff;
  text-align: center;
}
.comment-item{
  border-bottom: solid 1px #fff;
  padding-left: 20px;
}
</style>