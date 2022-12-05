# Texture 贴图

<div grid="~ cols-2 gap-4">
<div>
```js
// 球状
const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8)
bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2)
bulbMaterial = new THREE.MeshStandardMaterial({
  emissive: 0xffffee,
  emissiveIntensity: 1,
  color: 0x000000
})
```
</div>

<ThreeJs type="TEXTURE" />

</div>
