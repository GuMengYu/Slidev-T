# Control 鼠标交互
<div grid="~ cols-2 gap-2">
<div>

```javascript
const controls = new Three.OrbitControls(
  camera,
  renderer.domElement
)
function animate() {
  requestAnimationFrame(animate);
  controls.update()
}
```

[Learn More](https://threejs.org/docs/index.html?q=control#examples/en/controls/OrbitControls)

</div>
<ThreeJs type="CONTROLS" />
</div>

