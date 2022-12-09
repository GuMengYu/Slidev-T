
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import * as Three from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


export function useMovement(width = 426, height = 426) {
	let renderer, camera, scene, clock = new Three.Clock(), controls, cube;

	function init(container) {
	
		// 场景-容器
		scene = new Scene()
		
		// 相机
		camera = new PerspectiveCamera(75, width / height, 0.1, 10000)
		camera.position.set(5,5,5)
		camera.lookAt(0 ,0 ,0)
		
		// 辅助坐标系
		const axes = new Three.AxesHelper(5)
		scene.add(axes)

		cube = new Three.Mesh(new Three.BoxGeometry(2,2,2), new Three.MeshBasicMaterial({color: 0x6667ab}))
		
		
		scene.add(cube)
		
		// 渲染器
		renderer = new WebGLRenderer()
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
		container.appendChild(renderer.domElement)
		controls = new OrbitControls(camera, renderer.domElement)
		controls.minDistance = 1
		controls.maxDistance = 20
		render()
	}
	function render() {
		renderer.render( scene, camera );
		controls.update()
	}
	
	function animate() {
		requestAnimationFrame( animate );
		const time = clock.getElapsedTime()
		cube.rotation.x = (time * 50	) / 180 * Math.PI
		cube.position.x = Math.sin(time) * 2
		render()
	}
	return {
		init,
		animate,
	}
}
