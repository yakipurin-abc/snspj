<template>
  <header>
    <div class="header-left">
      <img src="../../img/logo.png">
    </div>
    <div class="header-right">
      <NuxtLink to="/register" class="register link">新規登録</NuxtLink>
      <NuxtLink to="/login" class="login link">ログイン</NuxtLink>
    </div>
  </header>
</template>
<style scoped>
header{
  background-color: rgb(23, 35, 49);
  display: flex;
  justify-content: space-between;
  height: 100px;
}
.header-left img{
  width: 25%;
  padding: 20px;
}
.header-right{
  margin-top: 40px;
}
.register {
  padding-right: 30px;
}
.login {
  margin-right: 50px;
}
.link{
  color: #fff;
  font-size: 20px;
  text-decoration: none;
}
</style>