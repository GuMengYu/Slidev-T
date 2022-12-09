
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export function useLoadModel(width = 426, height = 426) {
	let renderer, camera, scene, clock = new Three.Clock(), controls: OrbitControls;

	function init(container) {

		// 场景-容器
		scene = new Scene()
    scene.background = new Three.Color('black');

		// 相机
		camera = new PerspectiveCamera(75, width / height, 0.1, 100)
		camera.position.set(0, 10, 20)
		// 光线
    {
      const skyColor = 0xB1E1FF;  // light blue
      const groundColor = 0xB97A20;  // brownish orange
      const intensity = 0.6;
      const light = new Three.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    {
      const directLight = new Three.DirectionalLight(0xffffff, 1)
      directLight.position.set(5, 10, 2);
      scene.add(directLight)
      scene.add(directLight.target)
    }

    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
      const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
      const halfFovY = Three.MathUtils.degToRad(camera.fov * .5);
      const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
      // compute a unit vector that points in the direction the camera is now
      // in the xz plane from the center of the box
      const direction = (new Three.Vector3())
          .subVectors(camera.position, boxCenter)
          .multiply(new Three.Vector3(1, 0, 1))
          .normalize();
  
      // move the camera to a position distance units way from the center
      // in whatever direction the camera was from the center already
      camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
  
      // pick some near and far values for the frustum that
      // will contain the box.
      camera.near = boxSize / 100;
      camera.far = boxSize * 100;
  
      camera.updateProjectionMatrix();
  
      // point the camera to look at the center of the box
      camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    }
    {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {
        const root = gltf.scene;
        scene.add(root);

        const box = new Three.Box3().setFromObject(root);

        const boxSize = box.getSize(new Three.Vector3()).length();
        const boxCenter = box.getCenter(new Three.Vector3());
  
        // set the camera to frame the box
        frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
  
        // update the Trackball controls to handle the new size
        controls.maxDistance = boxSize * 10;
        controls.target.copy(boxCenter);
        controls.update();
      });
    }

		// 渲染器
		renderer = new Three.WebGLRenderer()
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
		container.appendChild(renderer.domElement)
		controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 5, 0)
    controls.update()
		// controls.minDistance = 1
		// controls.maxDistance = 200
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
