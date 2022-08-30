<template>
  <div>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input
          type="text"
          placeholder="输入您想搜索的内容"
          v-model="keyWord"
        />&nbsp;
        <button @click="searchUser">搜索</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MySearch",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    searchUser() {
      // 请求前更新List的数据;
      this.$bus.$emit("uppListDate", {
        isFirst: false,
        isLoading: true,
        users: [],
      });
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        (response) => {
          console.log("请求成功了", response.data.items);
          //请求成功更新List的数据
          this.$bus.$emit("uppListDate", {
            isLoading: false,
            users: response.data.items,
          });
        },
        (error) => {
          //请求失败更新List的数据
          console.log("请求失败了", error.message);
          this.$bus.$emit("uppListDate", {
            isLoading: false,
            errMsg: error.message,
            users: [],
          });
        }
      );
    },
  },
};
</script>
<style></style>
