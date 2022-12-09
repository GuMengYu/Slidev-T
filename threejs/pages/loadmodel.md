# 外部模型加载

<div grid="~ cols-2 gap-4">
<div>

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const gltfLoader = new GLTFLoader();
gltfLoader.load('/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {
  const root = gltf.scene;
  scene.add(root);
  ...
});
```

[Learn More](https://threejs.org/docs/index.html?q=loader#api/en/loaders/Loader)
</div>
<div>
  <ThreeJs type="LOADMODEL" />
</div>

</div>

<!--

-->
