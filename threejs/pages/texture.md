# Texture 贴图

<div grid="~ cols-2 gap-4">
<div>

```javascript

const textureLoader = new THREE.TextureLoader()

const m1 = new THREE.MeshBasicMaterial({map: textureLoader.load(crate)})
const m2 = new THREE.MeshBasicMaterial({map: textureLoader.load(alphaMap)})
const m3 = new THREE.MeshBasicMaterial({map: textureLoader.load(brick_bump)})
const m4 = new THREE.MeshBasicMaterial({map: textureLoader.load(brick_diffuse)})
const m5 = new THREE.MeshBasicMaterial({map: textureLoader.load(brick_roughness)})
const m6 = new THREE.MeshBasicMaterial({map: textureLoader.load(disturb)})
const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), [m1, m2, m3, m4, m5, m6])

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 500, 500),
  new MeshBasicMaterial({map:textureLoader.load(land_ocean_ice_cloud_2048)}
  )
)

```
</div>

<ThreeJs type="TEXTURE" />

</div>
