
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export function useGeomertry(width = 426, height = 426) {
	let renderer, camera, scene, clock = new Three.Clock(), controls;

	function init(container) {

		// 场景-容器
		scene = new Scene()

		// 相机
		camera = new PerspectiveCamera(75, width / height, 0.1, 10000)
		camera.position.set(2, 1, 3)
		camera.lookAt(0, 0, 0)
		// 光线

		const ambientLight = new Three.AmbientLight( 0xcccccc, 0.4 );
		scene.add( ambientLight );

		const pointLight = new Three.PointLight( 0xffffff, 0.8 );
		camera.add( pointLight );
		scene.add( camera );

		const material = new Three.MeshPhongMaterial({color: 0x049ef4, flatShading: true, side: Three.DoubleSide });

		const cubeGeo = new Three.BoxGeometry(1, 1, 1 );
		const sphereGeo = new Three.SphereGeometry(0.5);
		const planeGeo = new Three.PlaneGeometry(1,1)
		const dodecahedronGeo= new Three.DodecahedronGeometry(0.5, 0)
		const coneGeo = new Three.ConeGeometry( 0.5, 1, 8 );


		const cube = new Three.Mesh(cubeGeo, material)
		const sphere = new Three.Mesh(sphereGeo, material)
		sphere.position.x = 1.5
		const plane = new Three.Mesh(planeGeo, material)
		plane.position.x  = -1.5
		plane.rotation.x = -90 / 180 * Math.PI

		const dodecahedron = new Three.Mesh(dodecahedronGeo, material)
		dodecahedron.position.y = 1.5

		const cone = new Three.Mesh(coneGeo, material)
		cone.position.y = -1.5

		scene.add(cube, sphere, plane, dodecahedron, cone)


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
