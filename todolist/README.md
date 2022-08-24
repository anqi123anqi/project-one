# todolist

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

###总结 TodoList 案例 1.组件化编程
(1)拆分静态组件:组件要按照功能点拆分,命名不应与 HTML 标签名相同
(2)实现动态组件:考虑好数据的存放位置,数据是一个组件在用,还是一些组件在用
1).一个组件在用:放在自身即可
2).一些组件在用:放在他们的共同父组件上(状态提升)
(3)实现交互:从绑定事件开始

2.props 适用
(1)父组件==>子组件 通信
(2)子组件==>父组件 通信(要求父级先给子组件传递一个函数)

3.使用 v-model 切记:v-model 绑定的值不能是 props 传递的参数 因为 props 不可修改

4.props 传过来的若是对象类型数据的值,修改对象中的属性时,Vue 不会报错,但不推荐
