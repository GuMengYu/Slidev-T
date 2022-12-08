import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator'


export function useBackground(width = 426, height = 426) {
  let renderer, camera, scene, clock = new Three.Clock(), controls, lightProbe;

  function init(container) {

    // 场景-容器
    scene = new Scene()

    // 相机
    camera = new PerspectiveCamera(75, width / height, 0.1, 10000)
    camera.position.set(5, 1, 5)
    camera.lookAt(0, 0, 0)
    // 光线
    // const light = new Three.PointLight(0xffffff, 0.8)
    // light.position.set(-100, 100, -100)
    // scene.add(light)


    // probe
    lightProbe = new Three.LightProbe();
    scene.add(lightProbe);

    // const geometry = new Three.SphereGeometry(0.5);
    // const material = new Three.MeshPhongMaterial({ color: 0x049ef4 });
    // const cube = new Three.Mesh(geometry, material)



    // envmap
    const genCubeUrls = function (prefix, postfix) {

      return [
        prefix + 'px' + postfix, prefix + 'nx' + postfix,
        prefix + 'py' + postfix, prefix + 'ny' + postfix,
        prefix + 'pz' + postfix, prefix + 'nz' + postfix
      ];

    };

    const urls = genCubeUrls('/images/skyboxsun/', '.jpg');

    new Three.CubeTextureLoader().load(urls, (cubeTexture) => {
      cubeTexture.encoding = Three.sRGBEncoding
      lightProbe.copy(LightProbeGenerator.fromCubeTexture(cubeTexture));
      scene.background = cubeTexture

      const geometry = new Three.SphereGeometry(1, 64, 32);
      //const geometry = new THREE.TorusKnotGeometry( 4, 1.5, 256, 32, 2, 3 );

      const material = new Three.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        envMap: cubeTexture,
        envMapIntensity: 1,
      });

      // mesh
      const mesh = new Three.Mesh(geometry, material);
      scene.add(mesh);
    })

    // 渲染器
    renderer = new Three.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)
    controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 1
    controls.maxDistance = 20
    render()
  }

  function initBg() {

  }
  function render() {
    renderer.render(scene, camera);
    controls.update()
  }

  function animate() {
    requestAnimationFrame(animate);
    render()
  }
  return {
    init,
    animate,
  }
}
