# Light 光线

<div grid="~ cols-2 gap-4">
<div>

```js
// 环境光，没有光源，是一种充满整个场景的光线
const light = new Three.AmbientLight()
scene.add(light)

// 平行光, 类似于太阳的平行光线
const light = new Three.DirectionalLight()
scene.add(light)

// 点光源, 灯泡这样的向所有方向发射的光源
const light = new Three.PointLight()
scene.add(light)

// 聚光灯, 圆锥体的光源
const light = new Three.SpotLight()
scene.add(light)

```

[Learn More](https://threejs.org/docs/index.html?q=light#api/en/lights/AmbientLight)
</div>

<ThreeJs type="LIGHT" />

</div>
