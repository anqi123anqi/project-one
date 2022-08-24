<template>
  <transition name="todo" appear>
    <li>
      <label>
        <!-- 如下代码也可以检测todo.done值变化，但不建议，修改了props，vue没有检测到 只能检测到todo变化，无法深度检测到todo.done的变化 -->
        <!-- <input type="checkbox" v-model="todo.done" /> -->
        <input type="checkbox" @change="handleCheck(todo.id)" />
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          v-show="todo.isEdit"
          type="text"
          :value="todo.title"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle"
        />
      </label>
      <button class="btn btn-danger" @click="handlDelete(todo.id)">删除</button>
      <button
        v-show="!todo.isEdit"
        class="btn btn-edit"
        @click="handleEdit(todo)"
      >
        编辑
      </button>
    </li>
  </transition>
</template>

<script>
export default {
  name: "MyItem",
  //生命接受todo对象
  props: ["todo"],
  methods: {
    // //勾选or不勾选
    // handleCheck(id) {
    //   //通知APP组件将对应id的todo对象值取反
    //   this.checkTodo(id);
    // },

    //勾选or不勾选
    handleCheck(id) {
      //通知APP组件将对应id的todo对象值取反
      this.$bus.$emit("checkTodo", id);
    },
    //删除
    handlDelete(todoid) {
      if (confirm("确定要删除吗")) {
        //通知App删除对应id的todoObj
        this.$bus.$emit("deleteTodo", todoid);
      }
    },
    //编辑
    handleEdit(todo) {
      if (todo.hasOwnProperty.call("isEdit")) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
    //失去焦点时回调（执行修改逻辑）
    handleBlur(todo, e) {
      todo.isEdit = false;
      if (!e.target.value.trim()) return alert("不能为空");
      this.$bus.$emit("updataTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}
li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #ddd;
}
li:hover button {
  display: block;
}
.todo-enter-active {
  animation: todo 0.5s linear;
}
.todo-leave-active {
  animation: todo 0.5s linear reverse;
}
@keyframes todo {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0px);
  }
}
li:hover {
  background-color: #ddd;
}
</style>
