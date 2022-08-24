<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "MyHeader",
  // props: ["addTodo"],
  data() {
    return {
      title: "",
    };
  },
  methods: {
    add(e) {
      if (!this.title.trim()) return alert("不能为空"); //return 表示结束   0 和 空字符串都是 false
      // //将用户的输入包装成一个对象
      const todoObj = { id: nanoid(), title: e.target.value, done: false };
      //通过函数调用，通知父级App添加一个todo对象
      // this.addTodo(todoObj);

      this.$emit("addTodo", todoObj);

      // pubsub.publish("addObj", todoObj);
      e.target.value = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}
.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
