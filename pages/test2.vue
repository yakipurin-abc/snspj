<template>
<div class="detail">
  <p class="home">home</p>
  <div class="list" v-for="item in contents" :key="item.id">
    <div class="itiro">
      <p>{{ item.user}}</p>
      <div class="itiro-img">
        <img src="~/assets/heart.png">
        <img src="~/assets/cross.png">
        <img class="arrow" src="~/assets/detail.png">
      </div>
    </div>
        
        <p>{{item.message}}</p>
  </div>
</div>
      
</template>
<script>
export default {
  data() {
    return {
      newName: "",
      newEmail: "",
      contents: [],
    };
  },
  methods: {
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
    this.getContent();
  },
};
</script>
<style scoped>
.detail{
  background-color: rgb(23, 35, 49);
  color: #fff;
}
.home{
  border-bottom: solid 1px #000;
  border-left: solid 1px #000;
  margin-top: 0;
  margin-bottom: 0;
}
.list{
  border-bottom: solid 1px #000;
  border-left: solid 1px #000;
  margin-top: 0;
}
p{
  margin-top: 0;
}
.itiro img{
  width: 20px;
  margin: 0 8px;
}
.itiro{
  display: flex;
  margin: 10px;
}
.itiro-img{
  margin-left: 15px;
}
.arrow{
  margin-right: 10px;
}
.itiro img:nth-child(3){
  margin-left: 20px;
}
</style>