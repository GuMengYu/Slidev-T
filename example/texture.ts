import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial } from 'three'
import * as Three from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import alphaMap from './texture/alphaMap.jpg'
import brick_bump from './texture/brick_bump.jpg'
import brick_diffuse from './texture/brick_diffuse.jpg'
import brick_roughness from './texture/brick_roughness.jpg'
import disturb from './texture/disturb.jpg'
import land_ocean_ice_cloud_2048 from './texture/land_ocean_ice_cloud_2048.jpg'

export function useTexture(width = 426, height = 426) {
  let camera, scene, controls, renderer;
  function init(container) {

    if (!container) return
    // 场景-容器
    scene = new Scene()

    const light = new Three.AmbientLight(0x404040); // soft white light
    scene.add(light);
    // 相机
    camera = new PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(-4, 4, 2)
    camera.lookAt(0, 0, 0)

    const textureLoader = new Three.TextureLoader()

    const m1 = new Three.MeshBasicMaterial({
      map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif')
    })
    const m2 = new Three.MeshBasicMaterial({
      map: textureLoader.load(alphaMap)
    })
    const m3 = new Three.MeshBasicMaterial({
      map: textureLoader.load(brick_bump)
    })
    const m4 = new Three.MeshBasicMaterial({
      map: textureLoader.load(brick_diffuse)
    })
    const m5 = new Three.MeshBasicMaterial({
      map: textureLoader.load(brick_roughness)
    })
    const m6 = new Three.MeshBasicMaterial({
      map: textureLoader.load(disturb)
    })
    const cube = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), [m1, m2, m3, m4, m5, m6])

    const earth = new Three.Mesh(new Three.SphereGeometry(1, 500, 500), new MeshBasicMaterial({ map: textureLoader.load(land_ocean_ice_cloud_2048) }))

    earth.position.set(4, 0, 0)


    scene.add(cube, earth)

    // 渲染器
    renderer = new WebGLRenderer()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement)
    controls = new OrbitControls(camera, renderer.domElement)
    render()
  }

  function render() {
    renderer.render(scene, camera);
    controls.update()
  }

  // 控制器

  const clock = new Three.Clock()
  function animate() {
    requestAnimationFrame(animate);
    render()
  }
  return {
    init,
    animate,
  }
}