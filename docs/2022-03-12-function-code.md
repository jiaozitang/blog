---
title: JavaScript 函数式编程-入门篇
date: 2022-03-12 19:11:14
---

![](https://img14.360buyimg.com/ling/jfs/t1/211906/13/12376/431721/6208fae4E49caa61b/7f286fcdbf89fd66.jpg)

本文将从什么是函数式编程、函数式编程的特点、如何使用函数式编程等 3 个方面带你入门 Javascript 函数式编程。

## 一、什么是函数式编程

先来一个官方的解释：

> **函数式编程**，是一种[编程范式](https://zh.wikipedia.org/wiki/%E7%BC%96%E7%A8%8B%E8%8C%83%E5%BC%8F)，它将[电脑运算](https://zh.wikipedia.org/wiki/%E9%9B%BB%E8%85%A6%E9%81%8B%E7%AE%97)视为[函数](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0)运算，并且避免使用程序[状态](https://zh.wikipedia.org/w/index.php?title=%E7%8A%B6%E6%80%81_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)&action=edit&redlink=1)以及[易变对象](https://zh.wikipedia.org/wiki/%E4%B8%8D%E5%8F%AF%E8%AE%8A%E7%89%A9%E4%BB%B6)。

比起[命令式编程](https://zh.wikipedia.org/wiki/%E6%8C%87%E4%BB%A4%E5%BC%8F%E7%B7%A8%E7%A8%8B)，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程。

### 1. 举例说明

有一个数据转换的需求，需要将 `['tom', 'bob', 'alice']` 转换为 `[{name: 'Tom'}, {name: 'Bob'}, {name: 'Alice'}]`。

解析一下功能点：

- 字符串数组转 `key` 为 `name` 数组对象；
- `name` 字符串转换为首字符大写。

#### 命令式编程

命令式编程实现该需求，实现思路如下：

- 声明临时变量 `arr2` 存放新数组；
- 声明临时变量 `first`、`rest` 存放字符串，并进行转首字母大写的操作；
- 通过 [array.map](http://array.map) 得到新数组，赋值给 `arr2`。

实现代码如下：

```javascript
const arr = ['tom', 'bob', 'alice']
const arr2 = arr.map(i => {
 const first = i.substring(0, 1)
 const rest = i.substring(1, i.length)
 return {
  name: first.toUpperCase() + rest.toLowerCase()
 }
})
```

#### 函数式编程

函数式编程实现该需求，实现思路如下：

- 字符串转首字母大写的函数；
- 字符串生成对象的函数；
- 字符串转指定格式对象的函数；
- 数组转数组对象的函数。

实现代码如下：

```javascript
const { curry, compose, map } = require('ramda')

// 首字符大写
const capitalize = (x) => x[0].toUpperCase() + x.slice(1).toLowerCase()

// 字符串生成对象
const genObj = curry((key, x) => {
  let obj = {}
  obj[key] = x
  return obj
})

// 字符串转对象，ex：'tom' => { name: 'Tom' }
const convert2Obj = compose(genObj('name'), capitalize)

// 数组转数组对象，ex：['tom'] => [{ name: 'Tom' }]
const convertName = map(convert2Obj)

console.log(convertName(['tom', 'bob', 'alice']))
```

> 这儿使用到了 [ramda](https://ramda.cn/)  包中的 `curry` 和 `compose` 函数。

从上面例子可知，函数式编程就是通过函数的组合变换去解决问题的一种编程方式。

在函数式编程中，函数是[头等对象](https://zh.wikipedia.org/wiki/%E5%A4%B4%E7%AD%89%E5%AF%B9%E8%B1%A1)，意思是说一个函数，既可以作为其它函数的输入参数值，也可以从函数中返回值，被修改或者被分配给一个变量。

## 二、函数式编程的特点

在上述例子中，函数式编程看起来比命令式编程更加复杂，难以理解，那我们为什么要学习函数式编程，它能够给我们带来什么呢？

学习函数式编程，是为了让我们在编程过程中有更多编程范式的选择，可以根据不同的场景选择不同的编程范式。

那为什么 React、Redux 这些流行框架都选择并推荐函数式编程呢？因为函数式编程相较于命令式编程、面向对象编程而言，更易维护，可读性高，方便扩展。

### 1. 声明式编程

函数式编程大多时候都是在声明我需要做什么，而非怎么去做。这种编程风格称为 [声明式编程](https://baike.baidu.com/item/%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%BC%96%E7%A8%8B/9939512)。

举例说明：在使用 React 时，只要描述UI，接下来状态变化后 UI 如何更新，是 React 在运行时帮你处理的，而不用开发者去写渲染逻辑和优化 diff 算法。

声明式编程具有以下优点：

- **简化开发者的工作**
- **减少重复工作**
- **留下改进的空间**
- **提供全局协调能力**

> 更详细的声明式编程介绍：[从年会看声明式编程(Declarative Programming)](https://zhuanlan.zhihu.com/p/26085755)。

### 2. 纯函数

函数式编程使用**纯函数**组合变换计算，纯函数指的是**相同的输入，永远会得到相同的输出**，纯函数有以下特征：

#### 2.1 不依赖外部状态

纯函数不会依赖全局变量、`this` 等外部状态。

```javascript
// 非纯函数
let counter = 0

function increment() {
  // 引用了外部变量
    return counter++
}

// 纯函数
const increment = (counter) => counter + 1
```

#### 2.2 数据不可变

纯函数不修改全局变量，不修改入参，不修改对象，当需要修改一个对象时，应该创建一个新的对象用来修改，而不是修改已有的对象。

```javascript
// 非纯函数
let obj = {}

function genObj() {
    obj.a = 'a'
}

// 纯函数
const genObj = (a) => {
    return {
        [a]: a
    }
}
```

#### 2.3 没有副作用

纯函数没有副作用，副作用是在计算结果的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互。

> 副作用可能包含，但不限于：更改文件系统、往数据库插入记录、发送一个 http 请求、可变数据、打印/log、获取用户输入、DOM 查询、访问系统状态等。

#### 2.4 小结

纯函数不会指向不明的 `this`、不会引用全局变量、不会直接修改数据，可以大大的提升代码的易维护性。

## 三、如何使用函数式编程

函数式编程中，函数是一等公民，那么怎么把一个复杂函数转换成多个单元函数，然后怎么把多个单元函数组合起来按顺序依次执行呢，这时候就需要用到柯里化（curry）和函数组合（compose）了。

### 1. 柯里化（curry）

柯里化的就是将一个多元函数，转换成一个依次调用的单元函数。

```javascript
f(a,b,c) → f(a)(b)(c)
```

如下是一个柯里化的加法函数：

```javascript
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12
```

如下是使用 ramda 封装的 curry 生成的单元函数：

```javascript
const { curry } = require('ramda');
const replace = curry((a, b, str) => str.replace(a, b));
const replaceSpaceWith = replace(/\s*/);
const replaceSpaceWithComma = replaceSpaceWith(',');
const replaceSpaceWithDash = replaceSpaceWith('-');
```

### 2. 函数组合（compose）

函数组合就是将多个函数组合成一个函数。

如下是使用 ramda 封装的 compose 生成的函数组合：

```javascript
const compose = require('ramda')

const f = x => x + 1;
const g = x => x * 2;
const fg = compose(f, g);
fg(1) //3

```

函数组合让代码变得简单而富有可读性，同时通过不同的组合方式，我们可以轻易组合出其他常用函数，让我们的代码更具表现力。

## 小结

通过上文，相信你已经对函数式编程有了一些了解，下方有一些参考资料，推荐你进行更深入的学习。

学习函数式编程只是为了让你在开发过程中多一个编程范式的选择，大多时候我们无法将所有函数写成纯函数的形式，但是我们仍可以学习函数式编程的不依赖外部状态、不改写数据的做法，通过减少共享的数据来减少开发过程的 bug 数。

希望本文能对你有所帮助，感谢阅读～

别忘了点个赞鼓励一下我哦，笔芯❤️

## 参考资料

- [函数式编程指北](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
- [简明 JavaScript 函数式编程——入门篇](https://juejin.cn/post/6844903936378273799)
- [函数式编程，真香](https://juejin.cn/post/6844903743117361165#heading-2)
- [从年会看声明式编程(Declarative Programming)](https://zhuanlan.zhihu.com/p/26085755)
