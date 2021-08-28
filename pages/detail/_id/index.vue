<template>
<div class="detail">
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

  <div class="comment">
    <div class="comment-ttl">
      <p>コメント</p>
    </div>
    <div class="comment-list">
      <div class="contents-item">
        <div v-for="item in contents" :key="item.id">
				  <div class="top-line">
            <p>{{item.user}}</p>
					<img v-if="item.isLike == false" src="~/assets/heart.png"  @click.prevent="like(item.id)">
					<img v-else src="~/assets/heart.png" @click.prevent="unlike(item.id)" class="unlike-img">
            <p>{{item.count}}</p>
					  <img @click="deleteContent(paramsId)" src="~/assets/cross.png">
          </div>
          <p>{{item.message}}</p>
          <p>{{paramsId}}</p>
				</div>
		  </div>
      <div class="comment-center">
        <p>コメント</p>
      </div>
        <div class="comment-item" v-for="content in comments" :key="content.id">
          <p>{{content.user}}</p>
          <p>{{content.comment}}</p>
        </div>
    </div>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <div class="comment-form">
        <validation-provider v-slot="{ errors }" rules="required|max:120">
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
        comment: '',
				user: '',
				message: '',
				email: '',
        paramsId: '',
      	contents:[],
        comments:[],
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
			async like(id) {
      	const addLike = {
        	user_id: this.user_id,
					rest_id: id,
      	};
      	await this.$axios.post("http://127.0.0.1:8000/api/v1/like", addLike);
				this.getContent();
        this.like_check();
    	},
			async unlike(id) {
				await this.$axios.request({
  				method: 'delete',
  				url: 'http://127.0.0.1:8000/api/v1/like/{like}',
  				data: {user_id: this.user_id,  rest_id: id},
				});
				this.getContent();
        this.like_check();
    	},
		async insertMessage() {
      const sendData = {
        message: this.message,
        user: this.user,
        user_id: this.user_id,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/v1/rest", sendData);
      this.getContent();
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
      this.paramsId = this.$route.params.id || ''
    },
    async insertComment() {
      const sendComment = {
        comment: this.comment,
        user: this.user,
        rest_id: this.paramsId
      };
      console.log(this.user);
      console.log("ユーザー");
      console.log(this.sendComment);
      console.log(this.paramsId);
      console.log("パラムスアイディー");
      await this.$axios.post("http://127.0.0.1:8000/api/v1/comment", sendComment);
      this.getComments()
    },
    async getContent() {
      const resData = await this.$axios.request({
  			method: 'get',
  			url: 'http://127.0.0.1:8000/api/v1/rest/' + this.paramsId,
  			data: {id: this.paramsId},
			});
      this.contents = resData.data.data;
      console.log(this.contents);
      console.log('コンテンツ');
    },
    async getComments() {
      const resComments = await this.$axios.request({
  			method: 'get',
  			url: 'http://127.0.0.1:8000/api/v1/comment/' + this.paramsId,
  			params: {rest_id: this.paramsId},
			});
      this.comments = resComments.data.comments;
      console.log(this.comments);
      console.log('ゲットコメント');
      console.log(this.paramsId);
      console.log("パラムスアイディー");
    },
	},
	created() {
  	this.certification();
    this.setParams();
    this.getContent();
    this.getComments();
  },
};

</script>
<style scoped>
.comment{
  margin-left: 3%;
	width: 100%;

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
  width: 50%;
  margin-left: 5%;
  margin-top: 5%;
}
.side-list{
  width: 20%;
  height: 100vh;
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
  margin-left: 10%;
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
.unlike-img{
  filter: invert(33%) sepia(70%) saturate(7000%) hue-rotate(310deg) brightness(60%) contrast(112%);
}
</style>

