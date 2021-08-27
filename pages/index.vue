<template>
  <div class="contents">
    <div class="contents-img">
      <img src="~/assets/logo.png">
    </div>
    <div class="contents-message">
      <h2>SHAREへようこそ!
      </h2>
      <p>SHEREをご利用になるには、すでに会員の方はログイン、<br/>新規の方は新規登録をしログインしてからご利用ください。</p>
      <NuxtLink to="/register" class="register link">新規登録</NuxtLink>
      <NuxtLink to="/login" class="login link">ログイン</NuxtLink>
    </div>
  </div>
</template>


<style scoped>
.contents{
  background-color: rgb(23, 35, 49);
  width: 100vw;
  height: 100vh;
  position: relative;
}
.contents-img{
  text-align: center;
}
img{
  padding-top: 5%;
  margin: 0 auto;
  width: 33%;
  height: 10%;
  text-align: center;

}
.contents-message{
  margin-top: 10%;
  color: #fff;
  text-align: center;
}
.link{
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  color: #fff;
}
.login{
  margin-left: 20px;
}
</style>
