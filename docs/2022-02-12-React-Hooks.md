---
title: React-你有完全了解 Hooks 吗 
date: 2022-02-12 19:11:14
---

![](https://img14.360buyimg.com/ling/jfs/t1/211906/13/12376/431721/6208fae4E49caa61b/7f286fcdbf89fd66.jpg)

> 本文从 Hooks 究竟是什么，为什么要使用 Hooks，React 提供了哪些常用 Hooks，以及如何自定义 Hooks 4 个方面带你深入理解 React Hooks。

## 一、前言

Hooks 用于在不编写 class 的情况下，使用 state 以及其他 React 特性。那么 Hooks 究竟是什么，为什么要使用 Hooks，React 提供了哪些常用 Hooks，以及如何自定义 Hooks 呢，下文将为您一一揭晓。

> 本文的学习资料主要来自 [React 官方文档-Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html)和王沛老师的专栏[《React Hooks 核心原理与实战》](https://time.geekbang.org/column/article/376577)。

## 二、什么是 Hooks

Hooks 译为钩子，Hooks 就是在函数组件内，负责钩进外部功能的函数。

React 提供了一些常用钩子，React 也支持自定义钩子，这些钩子都是用于为函数引入外部功能。

当我们在组件中，需要引入外部功能时，就可以使用 React 提供的钩子，或者自定义钩子。

比如在组件内引入可管理 state 的功能，就可以使用 useState 函数，下文会详细介绍 useState 的用法。

## 三、为什么要用 Hooks

使用 Hooks 有 2 大原因：

- 简化逻辑复用；
- 让复杂组件更易理解。

### 1. 简化逻辑复用

在 Hooks 出现之前，React 必须借用高阶组件、render props 等复杂的设计模式才能实现逻辑的复用，但是高阶组件会产生冗余的组件节点，让调试更加复杂。

Hooks 让我们可以在无需修改组件结构的情况下复用状态逻辑，下文会详细介绍自定义 Hooks 的用法。

### 2. 让复杂组件更易理解

在 class 组件中，同一个业务逻辑的代码分散在组件的不同生命周期函数中，而 Hooks 能够让针对同一个业务逻辑的代码聚合在一块，让业务逻辑清晰地隔离开，让代码更加容易理解和维护。

## 四、常用的 Hooks

### 1. useState

useState 是允许你在 React 函数组件中添加 state 的 Hook。

使用示例如下：

```javascript
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  // ...
```

以上代码声明了一个初始值为 0 的 state 变量 count，通过调用 setCount 来更新当前的 count。

### 2. useEffect

useEffect 可以让你在函数组件中执行副作用操作。

副作用是指一段和当前执行结果无关的代码，常用的副作用操作如数据获取、设置订阅、手动更改 React 组件中的 DOM。

useEffect 可以接收两个参数，代码如下：

```javascript
useEffect(callback, dependencies)
```

第一个参数是要执行的函数 callback，第二个参数是可选的依赖项数组 dependencies。

其中依赖项是可选的，如果不指定，那么 callback 就会在每次函数组件执行完后都执行；如果指定了，那么只有依赖项中的值发生变化的时候，它才会执行。

使用示例如下：

```javascript
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;

    return () => {
        // 可用于做清除，相当于 class 组件的 componentWillUnmount
    }

  }, [count]); // 指定依赖项为 count，在 count 更新时执行该副作用
  // ...
```

以上代码通过 useEffect 实现了当依赖项 count 更新时，执行副作用函数，并通过返回回调函数清除上一次的执行结果。

另外，useEffect 提供了四种执行副作用的时机：

- **每次 render 后执行**：不提供第二个依赖项参数。比如 useEffect(() => {})；
- **仅第一次 render 后执行**：提供一个空数组作为依赖项。比如 useEffect(() => {}, [])；
- **第一次以及依赖项发生变化后执行**：提供依赖项数组。比如 useEffect(() => {}, [deps])；
- **组件 unmount 后执行**：返回一个回调函数。比如 useEffect() => { return () => {} }, [])。

### 3. useCallback

useCallback 定义的回调函数只会在依赖项改变时重新声明这个回调函数，这样就保证了**组件不会创建重复的回调函数**。而接收这个回调函数作为属性的组件，也**不会频繁地需要重新渲染**。

使用示例如下：

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

以上代码在依赖项 a、b 发生变化时，才会重新声明回调函数。

### 4. useMemo

useMemo 定义的创建函数只会在某个依赖项改变时才重新计算，有助于每次渲染时**不会重复的高开销的计算**，而接收这个计算值作为属性的组件，也**不会频繁地需要重新渲染**。

使用示例如下：

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

以上代码在依赖项 a、b 发生变化时，才会重新计算。

### 5. useRef

useRef 返回一个 ref 对象，这个 ref 对象在组件的整个生命周期内持续存在。

他有 2 个用处：

- **保存 DOM 节点的引用**；
- **在多次渲染之间共享数据**。

保存 DOM 节点的引入使用示例如下：

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type='text' />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

以上代码通过 useRef 创建了 ref 对象，保存了 DOM 节点的引用，可以对 ref.current 做 DOM 操作。

在多次渲染之间共享数据示例如下：

```javascript
import React, { useState, useCallback, useRef } from 'react'

export default function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0)

  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef(null)

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1)
    }, 100)
  }, [])

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current)
    timer.current = null
  }, [])

  return (
    <div>
      {time / 10} seconds.
      <br />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  )
}
```

以上代码通过 useRef 创建了一个变量名为 timer 的 ref 对象，该对象可以在跨组件渲染时调用，在开始计时时新建计时器，在暂停计时时清空计时器。

### 6. useContext

useContext 用于接收一个 context 对象并返回该 context 的值，可以实现跨层级的数据共享。

示例如下：

```javascript
// 创建一个 context 对象
const MyContext = React.createContext(initialValue)
function App() {
  return (
    // 通过 Context.Provider 传递 context 的值
    <MyContext.Provider value='1'>
      <Container />
    </MyContext.Provider>
  )
}

function Container() {
  return <Test />
}

function Test() {
  // 获取 Context 的值
  const theme = useContext(MyContext) // 1
  return <div></div>
}
```

以上代码通过 useContext 取得了 App 组件中定义的 Context，做到了跨层次组件的数据共享。

### 7. useReducer

useReducer 用来引入 Reducer 功能。

示例如下：

```javascript
const [state, dispatch] = useReducer(reducer, initialState)
```

它接受 Reducer 函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 action 的 dispatch 函数。

## 五、自定义 Hooks

通过自定义 Hooks，可以将组件逻辑提取到可重用的函数中。

### 1. 如何创建自定义 Hooks？

自定义 Hooks 就是函数，它有 2 个特征区分于普通函数：

- 名称以 “use” 开头；
- 函数内部调用其他的 Hook。

示例如下：

```javascript
import { useState, useCallback } from 'react'

function useCounter() {
  // 定义 count 这个 state 用于保存当前数值
  const [count, setCount] = useState(0)
  // 实现加 1 的操作
  const increment = useCallback(() => setCount(count + 1), [count])
  // 实现减 1 的操作
  const decrement = useCallback(() => setCount(count - 1), [count])
  // 重置计数器
  const reset = useCallback(() => setCount(0), [])

  // 将业务逻辑的操作 export 出去供调用者使用
  return { count, increment, decrement, reset }
}

// 组件1
function MyComponent1() {
  const { count, increment, decrement, reset } = useCounter()
}

// 组件2
function MyComponent2() {
  const { count, increment, decrement, reset } = useCounter()
}
```

以上代码通过自定义 Hooks useCounter，轻松的在 MyComponent1 组件和 MyComponent2 组件之间复用业务逻辑。

### 2. 自定义 Hooks 库 - react-use

React 官方提供了 [react-use](https://github.com/streamich/react-use) 库，其中封装了大量可直接使用的自定义 Hooks，帮助我们简化组件内部逻辑，提高代码可读性、可维护性。

其中我们常用的自定义 Hooks 有：

- useLocation 和 useSearchParam：跟踪页面导航栏位置状态；
- useScroll：跟踪 HTML 元素的滚动位置；
- useScrolling：跟踪 HTML 元素是否正在滚动；
- useAsync, useAsyncFn, and useAsyncRetry：解析一个 async 函数；
- useTitle：设置页面的标题。

> 可至 [react-use 官网](https://github.com/streamich/react-use)学习使用。

## 六、小结

本文从 Hooks 究竟是什么，为什么要使用 Hooks，React 提供了哪些常用 Hooks，以及如何自定义 Hooks 4 个方面介绍了 React Hooks，相信大家对 React Hooks 已经有了更加深入的理解。

希望能对你有所帮助，感谢阅读～

别忘了点个赞鼓励一下我哦，笔芯 ❤️

## 参考资料

- [React 官方文档-Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html)
- [React Hooks 核心原理与实战](https://time.geekbang.org/column/article/376577)
- [React Hooks 入门教程](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)
- [轻松掌握 React Hooks 底层实现原理](https://segmentfault.com/a/1190000038768433)
- [阅读源码后，来讲讲 React Hooks 是怎么实现的](https://juejin.cn/post/6844903704437456909)
