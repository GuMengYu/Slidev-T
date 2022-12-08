---
title: Camera 相机
---

# Camera 相机

<div grid="~ cols-2 gap-4">
<div>

```javascript
// 透视相机 PerspectiveCamera // 
// fov: 视角
// aspect: 长宽比
// near: 所能看到的最近距离
// far: 能看到的最远距离
let camera = new Three.PerspectiveCamera(
  75,
  16/9,
  0.1, 10000
)
// 相机摆放的位置
camera.position.set(5,5,5) 
// 相机朝向的方向
camera.lookAt(0,0,0)
// 缩放
camera.zoom = 1
```

```javascript
const cameraHelper = new Three.CameraHelper(camera)
scene.add(cameraHelper)
```

[Learn More](https://threejs.org/manual/examples/cameras-perspective-2-scenes.html)

</div>
<div>
   <img border="rounded" src="/images/frustum-3d.svg" height="200" style="width: 100%;height: 200px; aspect-ratio: 16 / 9;">
  <ThreeJs type="CAMERA" width="426" height="200" />
</div>

</div>

<!--
描述这个
-->
