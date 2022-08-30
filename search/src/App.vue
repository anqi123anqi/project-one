<template>
  <div class="container">
    <MySearch />
    <MyList />
  </div>
</template>

<script>
import MySearch from "./components/MySearch.vue";
import MyList from "./components/MyList.vue";

export default {
  name: "App",
  components: {
    MySearch,
    MyList,
  },
};
</script>

<style></style>
