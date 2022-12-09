---
# try also 'default' to start simple
theme: default
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
  ## Three.js 入门介绍
  简单介绍Three.js的基础用法.

  官方文档 [threejs](https://threejs.org/)
# persist drawings in exports and build
drawings:
  persist: false
# use UnoCSS
css: unocss
---
<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
# Three.js 从入门到入门

##### 🥲

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Start <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
src: ./pages/into.md
hide: false
---

---
src: ./pages/basic.md
hide: false
---

---
src: ./pages/compose.md
hide: false
---

---
src: ./pages/transform.md
hide: false
---


---
src: ./pages/movement.md
hide: false
---

---
src: ./pages/control.md
hide: false
---

---
src: ./pages/group.md
hide: false
---

---
src: ./pages/geometry.md
hide: false
---

---
src: ./pages/material.md
hide: false
---


---
src: ./pages/light.md
hide: false
---

---
src: ./pages/texture.md
hide: false
---


---
src: ./pages/camera.md
hide: false
---

---
src: ./pages/background.md
hide: false
---

---
src: ./pages/road.md
hide: false
---

---
src: ./pages/loadmodel.md
hide: false
---

---
src: ./pages/editor.md
hide: false
---

---
src: ./pages/other.md
hide: false
---

---
layout: center
class: text-center
---

# End

[Powered by Slidev](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev)
