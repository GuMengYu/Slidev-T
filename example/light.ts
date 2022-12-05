import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, Light, MeshBasicMaterial } from 'three'
import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as datGUI from 'dat.gui'

export function useLight(width = 426, height = 426) {
  const GUI = datGUI.GUI
  const hemiLuminousIrradiances = {
    '0.0001 lx (Moonless Night)': 0.0001,
    '0.002 lx (Night Airglow)': 0.002,
    '0.5 lx (Full Moon)': 0.5,
    '3.4 lx (City Twilight)': 3.4,
    '50 lx (Living Room)': 50,
    '100 lx (Very Overcast)': 100,
    '350 lx (Office Room)': 350,
    '400 lx (Sunrise/Sunset)': 400,
    '1000 lx (Overcast)': 1000,
    '18000 lx (Daylight)': 18000,
    '50000 lx (Direct Sun)': 50000
  };
  const bulbLuminousPowers = {
    '110000 lm (1000W)': 110000,
    '3500 lm (300W)': 3500,
    '1700 lm (100W)': 1700,
    '800 lm (60W)': 800,
    '400 lm (40W)': 400,
    '180 lm (25W)': 180,
    '20 lm (4W)': 20,
    'Off': 0
  };
  const params = {
    shadows: true,
    exposure: 0.68,
    bulbPower: Object.keys(bulbLuminousPowers)[4],
    hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0]
  };
  
  let stat, scene, camera, renderer, controls, bulbLight, bulbMaterial, hemiLight, floorMaterial, earthMaterial, cubeMaterial
  
  let previousShadowMap = false
  
  function init(container) {
    console.log(container, container.clientHeight, container.clientWidth)
    // // fps显示
    // stat = new Stat()
    // container.append(stat.dom)
  
    // 场景-容器
    scene = new Scene()
  
    // 相机
    camera = new PerspectiveCamera(50, width/height, 0.1, 100)
    camera.position.set(-4, 4, 2)
    camera.lookAt(0, 0, 0)
  
  
    const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8)
    bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2)
    bulbMaterial = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000
    })
    bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMaterial))
    bulbLight.position.set(0, 2, 0)
    bulbLight.castShadow = true
    scene.add(bulbLight)
  
  
    hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
    scene.add(hemiLight);
  
    floorMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
      bumpScale: 0.0005,
    })
  
    const textureLoader = new THREE.TextureLoader()
  
    textureLoader.load('./hardwood2_diffuse.jpg', (map) => {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(10, 24);
      floorMaterial.map = map;
      floorMaterial.needsUpdate = true;
    })
  
    textureLoader.load('./hardwood2_bump.jpg', (map) => {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(10, 24);
      floorMaterial.bumpMap = map;
      floorMaterial.needsUpdate = true;
    })
  
    textureLoader.load('./hardwood2_roughness.jpg', (map) => {
  
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(10, 24);
      floorMaterial.roughnessMap = map;
      floorMaterial.needsUpdate = true;
    });
  
    const floorGeometry = new THREE.PlaneGeometry(20, 20)
    const floor = new Mesh(floorGeometry, floorMaterial)
    floor.receiveShadow = true
    floor.rotation.x = -Math.PI / 2.0
    scene.add(floor)
  
  
  
    earthMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 1.0
    })
  
    textureLoader.load('./planets/earth_atmos_4096.jpg', map => {
  
      map.anisotropy = 4;
      map.encoding = THREE.sRGBEncoding;
      earthMaterial.map = map;
      earthMaterial.needsUpdate = true;
    })
  
    textureLoader.load('./planets/earth_specular_2048.jpg', map => {
      map.anisotropy = 4;
      map.encoding = THREE.sRGBEncoding;
      earthMaterial.metalnessMap = map;
      earthMaterial.needsUpdate = true;
    })
  
    cubeMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      color: 0xffffff,
      bumpScale: 0.002,
      metalness: 0.2
    });
    textureLoader.load('./brick_diffuse.jpg', function (map) {
  
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(1, 1);
      map.encoding = THREE.sRGBEncoding;
      cubeMaterial.map = map;
      cubeMaterial.needsUpdate = true;
  
    });
    textureLoader.load('./brick_bump.jpg', function (map) {
  
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(1, 1);
      cubeMaterial.bumpMap = map;
      cubeMaterial.needsUpdate = true;
    });
  
    const earth = new Mesh(new THREE.SphereGeometry(0.5, 30, 30), earthMaterial)
    earth.position.set(1, 0.5, 1);
    earth.castShadow = true
    earth.rotation.y = Math.PI
    scene.add(earth)
  
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const boxMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    boxMesh.position.set(- 0.5, 0.25, - 1);
    boxMesh.castShadow = true;
    scene.add(boxMesh);
  
    const boxMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    boxMesh2.position.set(0, 0.25, - 5);
    boxMesh2.castShadow = true;
    scene.add(boxMesh2);
  
    const boxMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    boxMesh3.position.set(7, 0.25, 0);
    boxMesh3.castShadow = true;
    scene.add(boxMesh3);
  
    // 渲染器
    renderer = new WebGLRenderer()
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.setPixelRatio( window.devicePixelRatio );
  
    renderer.setSize(width, height)
  
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)
  
    controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 1
    controls.maxDistance = 20
  
    render()
  
    // const gui = new GUI();
  
    // gui.add(params, 'hemiIrradiance', Object.keys(hemiLuminousIrradiances));
    // gui.add(params, 'bulbPower', Object.keys(bulbLuminousPowers));
    // gui.add(params, 'exposure', 0, 1);
    // gui.add(params, 'shadows');
    // gui.open();
  
  }
  function animate() {
    requestAnimationFrame(animate)
    render()
  }
  function render() {
  
    renderer.toneMappingExposure = Math.pow(params.exposure, 5.0); // to allow for very bright scenes.
    renderer.shadowMap.enabled = params.shadows
    bulbLight.castShadow = params.shadows
    if (params.shadows !== previousShadowMap) {
      earthMaterial.needsUpdate = true
      floorMaterial.needsUpdate = true;
      previousShadowMap = params.shadows;
    }
    bulbLight.power = bulbLuminousPowers[params.bulbPower]
    bulbMaterial.emissiveIntensity = bulbLight.intensity / Math.pow(0.02, 2.0);
    hemiLight.intensity = hemiLuminousIrradiances[params.hemiIrradiance];
    const time = Date.now() * 0.0005;
    bulbLight.position.y = Math.cos(time) * 0.75 + 1.25;
    renderer.render(scene, camera);
    // stat.update();
    controls.update()
  }
  return {
    init,
    animate,
  }
}