<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"></MyHeader>
        <MyList :todos="todos"></MyList>
        <MyFooter :todos="todos" @clearAllTodo="clearAllTodo"></MyFooter>
        <!-- @chechAllTodo="chechAllTodo" -->
      </div>
    </div>
  </div>
</template>
<script>
import pubsub from "pubsub-js";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
export default {
  name: "App",
  components: { MyHeader, MyList, MyFooter }, //{ id: "001", title: "吃饭", done: true },{ id: "002", title: "睡觉", done: false },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    //添加一个todo
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    // #region
    // //修改指定id的todos的done值 （勾选或取消勾选）
    // checkTodo(todoid) {
    //   this.todos.forEach((todo) => {
    //     if (todo.id === todoid) todo.done = !todo.done;
    //   });
    // },

    // //删除对应id的todosObj
    // deleteTodo(todoid) {
    //   this.todos = this.todos.filter((todo) => {
    //     return todo.id !== todoid;
    //   });
    // },
    //#region

    // //全选 or 取消全选
    // chechAllTodo(done) {
    //   this.todos.forEach((todo) => {
    //     todo.done = done;
    //   });
    // },
    //清除所有已完成的任务
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return todo.done == false;
      });
    },
  },

  watch: {
    todos: {
      deep: true,
      handler(newval) {
        localStorage.setItem("todos", JSON.stringify(newval));
      },
    },
  },
  mounted() {
    //清楚对应id的数据
    this.$bus.$on("deleteTodo", (todoid) => {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== todoid;
      });
    });
    //修改指定id的todos的done值 （勾选或取消勾选）
    this.$bus.$on("checkTodo", (todoid) => {
      this.todos.forEach((todo) => {
        if (todo.id === todoid) todo.done = !todo.done;
      });
    });
    //难道修改后的数据
    this.$bus.$on("updataTodo", (todoId, newval) => {
      this.todos.forEach((todo) => {
        if (todo.id === todoId) todo.title = newval;
      });
    });
    //全选 or 取消全选
    this.pubdone = pubsub.subscribe("chechAllTodo", (_, value) => {
      console.log(value);
      this.todos.forEach((todo) => {
        todo.done = value;
        console.log(todo.done);
      });
    });

    // //添加一个todo
    // this.pubId = pubsub.subscribe("addObj", (todoObj) => {
    //   this.todos.unshift(todoObj);
    // });
  },
  beforeDestroy() {
    this.$bus.$off(["deleteTodo", "checkTodo", "updataTodo"]);
    pubsub.unsubscribe(this.pubdone);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #fff;
  background-color: lightgreen;
  border: 1px solid green;
  margin-right: 5px;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn-edit:hover {
  color: #fff;
  background-color: green;
}
.btn:focus {
  outline: none;
}
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
