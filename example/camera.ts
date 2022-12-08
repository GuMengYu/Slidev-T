
import { Scene, PerspectiveCamera, WebGLRenderer, Camera } from 'three'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export function useCamera(width = 426, height = 426) {
	let renderer, camera: PerspectiveCamera, scene, clock = new Three.Clock(), controls, cameraHelper;

	function init(container) {

		// 场景-容器
		scene = new Scene()

		// 相机
		camera = new PerspectiveCamera(75, width / height, 0.1, 10000)
		camera.position.set(3, 3, 3)
		camera.lookAt(0, 0, 0)
		camera.zoom = 1

		const light = new Three.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);

		const cameraHelper = new Three.CameraHelper(camera)
		scene.add(cameraHelper)

		{
    const planeSize = 15;

    const loader = new Three.TextureLoader();
    const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
    texture.wrapS = Three.RepeatWrapping;
    texture.wrapT = Three.RepeatWrapping;
    texture.magFilter = Three.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new Three.PlaneGeometry(planeSize, planeSize);
    const planeMat = new Three.MeshPhongMaterial({
      map: texture,
      side: Three.DoubleSide,
    });
    const mesh = new Three.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  }
	{
    const sphereRadius = 1;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new Three.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    const sphereMat = new Three.MeshPhongMaterial({color: '#CA8'});
    const mesh = new Three.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-0, sphereRadius, 0);
    scene.add(mesh);
  }

		// 渲染器
		renderer = new Three.WebGLRenderer()
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
		container.appendChild(renderer.domElement)
		controls = new OrbitControls(camera, renderer.domElement)
		render()
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
