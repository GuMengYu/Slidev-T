---
title: 最简单的three.js程序
---

# 最简单的three.js程序

<div grid="~ cols-2 gap-4">
<div>

```javascript
import * as Three from 'three'
// 场景 - 相当于一个房间
let scene = new Three.Scene()
// 光源 - 房间的灯光，有光线才能看见具体的内容
let light = new Three.SpotLight()
scene.add(light)
// 相机 - 相当于人的眼睛
let camera = new Three.PerspectiveCamera(75, width / height, 0.1, 10000)
// 物体-房间内的东西
// 几何体 - 骨架
const geometry = new Three.BoxGeometry( 1, 1, 1 );
// 材质 - 皮肤
const material = new Three.MeshNormalMaterial();
const mesh = new Three.Mesh(geometry, material)
scene.add(mesh)
// 渲染器 renderer, 需要计算机去执行计算，渲染出具体的画面
renderer = new Three.WebGLRenderer()
// 设置像素比, 防止canvas画布模糊
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(500, 500)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)
```
</div>
<div>
  <img border="rounded" src="/images/house.png" :width="300">
  <ThreeJs type="BASIC" :width="400" :height="230" />
</div>

</div>

<!--
描述这个
-->
