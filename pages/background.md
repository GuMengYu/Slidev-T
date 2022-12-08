---
title: Scene Background 场景背景
---
# Scene Background 场景背景

<div grid="~ cols-2 gap-4">
<div>

```javascript

// 纯色背景
scene.background = new Three.Color(0xff0000)
// 天空背景 urls 六个面的图片数组
new Three.CubeTextureLoader().load(urls, (cubeTexture) => {
  cubeTexture.encoding = Three.sRGBEncoding
  scene.background = cubeTexture
})
// 贴图背景
new Three.TextureLoader().load(url, texture => {
  scene.background = texture
})

```
</div>
<div>
  <ThreeJs type="BACKGROUND"   />
</div>

</div>

<!--
描述这个
-->
