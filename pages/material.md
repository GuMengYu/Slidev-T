# Material 材质

<div grid="~ cols-2 gap-4" m="-t-2">
<div>

```javascript
const sphere = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshLambertMaterial({ color: 0x6667ab })
);
const sphere1 = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshBasicMaterial({ color: 0x6667ab })
);
const sphere2 = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshPhongMaterial({ color: 0x6667ab, shininess: 80 })
);
const sphere3 = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshStandardMaterial({
    color: 0x6667ab,
    metalness: 0.2,
    roughness: 0,
  })
);
```

[Learn More](https://threejs.org/manual/#zh/materials)
</div>

<ThreeJs type="MATERIAL" />
</div>

<!--
-->
