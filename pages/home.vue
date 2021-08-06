<template>
  <div class="home">
		<div class="side-list">
			<ContentsList></ContentsList>
		</div>
		<div class="contents">
			<h2 class="contents-ttl">ホーム</h2>
			<div class="contents-item">
				<table>
						<tr>
							<td>
							<p>a</p>
							<p>b</p>
							<p>c</p>
							</td>
						</tr>
					<tr>
						<td>b</td>
					</tr>
					<tr v-for="content in contents" :key="content.name">
						<td>
							<div class="name-line">
								<p>{{content.name}}</p>
								<img @click="countChange" src="~/assets/heart.png">
								<p>{{count}}</p>
								<img @click="cross" src="~/assets/cross.png">
								<img @click="detail" src="~/assets/detail.png">
							</div>
							<p>{{content.message}}</p>
						</td>
				  </tr>
				</table>
			</div>
		</div>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase'
import ContentsList from "@/components/ContentsList.vue";
	export default {
		data() {
			return{
				contents:[],
				name: null,
				email: null,
				message: 'ログインができておりません',
			}
			components: {
				ContentsList
			};
		},
	};

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
}
.contents-ttl{
	padding: 10px;
	border-bottom: solid 2px #fff;
	border-left: solid 2px #fff;
	width: 100%;
	margin-top: 0;
	margin-bottom: 0;
}
td{
		border-bottom: solid 2px #fff;
		width: 100%;
		border-left: solid 2px #fff;
		margin-left: 0;
}
.item{
	width: 100%;
}
table{
	width: 100%;
}
</style>