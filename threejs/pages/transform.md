# 坐标系和变换

<div grid="~ cols-2 gap-4">
<div>

- 立体的三维坐标 x y z
- 变换: 
  1. position 位置变换
  2. rotation 旋转
  3. scale 缩放

```javascript
const cube = new Three.Mesh(...)

cube.position.set(1,1,1)

cube.position.x = 1
cube.position.y = 1
cube.position.z = 1

cube.rotation.x = 45 / 180 * Math.PI

cube.scale.x = 2
cube.scale.y = 2

```
</div>

<ThreeJs type="TRANSFORM" />

</div>
