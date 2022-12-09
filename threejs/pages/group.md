# Group 组

<div grid="~ cols-2 gap-2">
<div>

```javascript
group = new Three.Group()
const geometry1 = new Three.BoxGeometry(1, 1, 1);
const geometry2 = new Three.BoxGeometry(1, 1, 1);

const material = new Three.MeshNormalMaterial();
const cube1 = new Three.Mesh(geometry1, material)
const cube2 = new Three.Mesh(geometry2, material)
cube2.position.x = 1.5

group.add(cube1, cube2)
scene.add(group)

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime()
  group.rotation.x = (time * 10) / 180 * Math.PI
  ...
}
```
</div>
<ThreeJs type="GROUP" />
</div>