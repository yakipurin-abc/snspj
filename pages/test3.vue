Home.vue
<template>
  <div v-if="isAuthenticated">
    <p>こんにちは @{{ userId }} さん</p>
    <button class="logout" @click="logOut">ログアウト</button>
    <router-link :to="{ name: 'user', params: { userId: userId } }"
      >マイページ</router-link
    >
    <hr />
    <button class="commentOpen" v-if="!post" @click="commentOpen">
      今日のやることを投稿する
    </button>
    <form v-if="post">
      <input v-model="comment" type="text" />

      <button class="commentbtn" @click="postComment">投稿する</button>
      <button @click="commentOpen">閉じる</button>
    </form>
    <hr />
    <p>タイムライン</p>
    <hr />
    <div v-for="(Comment, index) in Comments" :key="index">
      <router-link :to="{ name: 'user', params: { userId: Comment.userId } }"
        >@{{ Comment.userId }}</router-link
      >
      <p>{{ Comment.comment }}</p>
      <p>{{ postTimes[index] }}</p>

      <hr />
    </div>
  </div>

  <div v-else>
    <p>ログインしてください</p>
  </div>
</template>
<script >
import axios from "axios";
export default {
  data() {
    return {
      userId: "",
      comment: "",
      postTimes: [],
      isAuthenticated: false,
      post: false,
      Comments: null,
    };
  },

  mounted: async function () {
    const response = await axios.get(
      "http://localhost:3000/comments/allComments",
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      }
    );
    const userResponse = await axios.get(
      "http://localhost:3000/user/user",
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      }
    );

    this.userId = userResponse.data.userId;

    this.Comments = response.data;
    for (let i = 0; i < this.Comments.length; i++) {
      const date = new Date(this.Comments[i].postTime);
      this.postTimes.push(
        `${date.getFullYear()}年${
          date.getMonth() + 1
        }月${date.getUTCDate()}日${date.getHours()}時${date.getMinutes()}分`
      );
    }

    if (userResponse.status === 200) {
      this.userId = userResponse.data.userId;
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
      return { message: "error" };
    }
  },
  methods: {
    async logOut() {
      const request = await axios.post(
        "http://localhost:3000/user/logout",
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(request);
      this.$cookies.remove("jwt");
      this.$router.push("/");
    },
    async postComment() {
      const now = new Date();
      this.postTime = now;
      await axios.post(
        "http://localhost:3000/comments/createComment",
        {
          userId: this.userId,
          comment: this.comment,
          postTime: this.postTime,
          fixedTime: null,
        },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
    },
    commentOpen() {
      this.post = !this.post;
    },
    makeURL() {},
  },
};
</script>

<style scoped>
input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.logout {
  position: absolute;
  right: 50px;
  top: 125px;
}
.commentbtn {
  background-color: #2ecc71;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.commentOpen {
  background-color: #2ecc71;
}


</style>