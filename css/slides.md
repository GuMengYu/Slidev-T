---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
# page transition
transition: slide-left
# use UnoCSS
css: unocss

aspectRatio: '21/9'
canvasWidth: 1600
---

# 怎么写好页面CSS?

切图仔三板斧之一

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
layout: default
---

# 通常情况下我们是怎么写 CSS 的

<div grid="~ cols-2 gap-4">
<div>

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

</div>
<div>
  
  1. 类命名困难：缺失命名规范，不同人不同的风格，没有什么可读性，给类取名字一个十分痛苦的事情，大多数时候类名不伦不类，难以读懂。BEM?
  
  2. 难以复用。css 样式很难通过语义化命名的 class 进行复用，因为一个 class 中包含了多条 css 样式，而多条 css 样式即使在同一语义环境下，也会因受到更大的上下文的影响，导致部分样式的差异化而无法直接复用 class。

  3. 需要按照html结构来书写样式选择器 导致 .media 重复出现很多次

  4. 重构成本高, 所有字号增加 2px 这类需求，需要改到大量文件

  5. 充斥这大量重复的样式代码
  ![image](/public/image.png)
  
</div>
</div>

---
layout: default
---
# 常用的样式书写方案

- Sass/Less: 预处理框架, 变量 嵌套书写，样式复用等

- CSS-in-js: React中推崇，React的组件形式全是js, html也适用jsx来写。样式用js对象来表达（原生支持）, 比较流行的库就是 emotion styled-component

```jsx
let SomeComponent = props => {
  return (
    <div
      css={{
        color: 'red'
      }}
      {...props}
    />
  )
}
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

```

- CSS Modules: 包含作用域，集中存在于一处地方，作用于单独的组件

- 原子化 CSS : 小巧且用途单一的 class，并且会以视觉效果进行命名 （tailwind css, windi css, unocss）（个人认为是目前比较好的方案，能很大提升开发效率）


---
transition: fade-out
---
# 什么是 原子化 CSS?

原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。

 1. class 的命名按照功能  2. class 的功能单一
```css
.mr-1 {
  margin-right: 0.25rem;
}
```

制作原子化 CSS 的传统方案其实用预处理器（这里的是 SCSS）生成如下代码：

```
@n: 80;
.pm(@i: 2) when (@i =< @n) {
  @v: @i + 0px;
  .p-@{i} {
    padding: @v;
  }
}
```
编译结果

```css
.p-1 { padding: 1px; }
.p-2 { padding: 2px; }
/* ... */
.m-10 { margin: 10px; }
```

1. 市面上有不少实用至上的 CSS 框架，如 Tailwind CSS，Windi CSS （停止维护）UnoCSS (Windi CSS 的继任者)
2. 同时有些 UI 库也会附带一些 CSS 工具类作为框架的补充，如 Bootstrap VuetifyJs


---
transition: fade-out
---

#

首先我们看看前文中提到组件使用 CSS 原子化是如何实现的，项目中已引入 TailwindCSS

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

1. 没有了命名的烦恼，按照功能命名

2. 没有相关嵌套，整体可读性加强

3. 没有重复 CSS 类， 一个功能对应一个类名，一个类名一个功能。没有重复

4. 没有新增 CSS 文件, vue中也不用写 style block。所有类名都是有工具库提供，项目中无需新增类了。

5. 不需要关注优先级

6. 以内联的方式使用媒体查询、伪类等

```html
  <button class="bg-purple-600 hover:bg-purple-70">
    Sign up
  </button>
```

7. 天然的 CSS 体积优化（一堆乱七八糟的样式，不敢删，不知道有没有其他地方用。）


---
transition: fade-out
---
# Tailwind CSS 使用

安装后添加配置
tailwind.config.js
```js
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
```

然后在入口css中引入就行了
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- 有记忆成本、可以结合官方文档、和编辑器插件来查找
- html 有人可能觉得看起来很丑（比较主观吧），适应一段时间
- tailwind CSS 的定制化程度可能不是很高(比如border 0 2 4 8 四个档), unocss 就可以更自由的配置自己需要的预设
- 可以通过@apply 来组合class 来达到复用的目的
