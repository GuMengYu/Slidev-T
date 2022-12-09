import { Scene, PerspectiveCamera, WebGLRenderer, Renderer, Camera } from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function useMaterial(width = 426, height = 426) {

  let scene, camera: Camera, ambientLight, directLight, renderer: WebGLRenderer, controls;
  function init(container) {
   
    // fps显示
    // 场景-容器
    scene = new Scene()

    // 相机
    camera = new PerspectiveCamera(75, width / height, 0.1, 100)
    camera.position.set(0, 5, 5)
    camera.lookAt(0, 0, 0)

    // 光源
    // 环境光
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // 直射光
    directLight = new THREE.DirectionalLight(0xffffff, 0.7)
    scene.add(directLight)

    // 辅助坐标系
    const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
    scene.add(gridHelper)

    // // 点光源 
    // const pointLight = new THREE.PointLight(0xffffff)
    // scene.add(pointLight)

    // 一个球
    const sphereGeometry = new THREE.SphereGeometry(1)
    const sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshLambertMaterial({ color: 0x6667ab }))
    const sphere1 = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshBasicMaterial({ color: 0x6667ab })
    );
    const sphere2 = new THREE.Mesh(sphereGeometry, new THREE.MeshPhongMaterial({ color: 0x6667ab, shininess: 80 }))
    const sphere3 = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ color: 0x6667ab, metalness: 0.1, roughness: 0 }))
    sphere1.position.x = -2
    sphere2.position.x = 2
    sphere3.position.x = 4
    scene.add(sphere, sphere1, sphere2, sphere2, sphere3)


    // 渲染器
    renderer = new WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.setSize(width , height)
    renderer.render(scene, camera);
    container.appendChild(renderer.domElement)


    // 控制器
    controls = new OrbitControls(camera, renderer.domElement)
    render()
  }
  function render() {
    controls.update()
    renderer.render( scene, camera )
  }
  function animate() {
    requestAnimationFrame(animate)
    render()
  }
  return {
    init,
    animate,
  }
}