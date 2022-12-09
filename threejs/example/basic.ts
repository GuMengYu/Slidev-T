
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import * as Three from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export function useBasic(width = 426, height = 426) {
	let renderer, camera, scene, clock = new Three.Clock(), controls;

	function init(container) {

		// 场景-容器
		scene = new Scene()

		// 相机
		camera = new PerspectiveCamera(75, width / height, 0.1, 10000)
		camera.position.set(3, 3, 3)
		camera.lookAt(0, 0, 0)
		// 光线
		const light = new Three.AmbientLight()
		scene.add(light)

		const geometry = new Three.BoxGeometry(2, 2, 2);
		const material = new Three.MeshNormalMaterial();
		const cube = new Three.Mesh(geometry, material)



		scene.add(cube)

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
