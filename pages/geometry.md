---
title: Geometry 几何体
---

# Geometry 几何体

<div grid="~ cols-2 gap-4">
<div>

```javascript
const material = new Three.MeshPhongMaterial();

// 方块
const cubeGeo = new Three.BoxGeometry(1, 1, 1 );
// 球状
const sphereGeo = new Three.SphereGeometry(0.5);
// 平面
const planeGeo = new Three.PlaneGeometry(1,1)
// 十二面体
const dodecahedronGeo= new Three.DodecahedronGeometry(0.5, 0)
// 锥体
const coneGeo = new Three.ConeGeometry( 0.5, 1, 8 );
...
```

[Learn More](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)
</div>

<div>
  <ThreeJs type="GEOMERTRY"  />
</div>

</div>

<!--
描述这个
-->
