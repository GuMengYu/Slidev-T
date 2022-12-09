import { Scene, PerspectiveCamera, WebGLRenderer, Mesh } from 'three'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function useRoad(width = 426, height = 426) {

  let cloudGroup, scene, camera, renderer, controls;
  function init(container) {
    // 场景-容器
    scene = new Scene()

    // 相机
    camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 50, 100)
    camera.lookAt(0, 0, 0)

    // // 辅助坐标系
    // const gridHelper = new Three.GridHelper(100, 20, 0xffffff, 0xffffff);
    // scene.add(gridHelper)

    //Light
    scene.add(new Three.AmbientLight(0xffffff, 0.2))
    const dLight = new Three.DirectionalLight(0xffffff)
    dLight.position.set(0, 1, 1)
    scene.add(dLight)

    const sun = new Three.PointLight(0xffee88)
    sun.add(new Mesh(new Three.SphereGeometry(), new Three.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000
    })))
    // sun.power = 100
    sun.position.set(50, 50, -60)
    scene.add(sun)


    // envmap
    const genCubeUrls = function ( prefix, postfix ) {

      return [
        prefix + 'px' + postfix, prefix + 'nx' + postfix,
        prefix + 'py' + postfix, prefix + 'ny' + postfix,
        prefix + 'pz' + postfix, prefix + 'nz' + postfix
      ];

    };

    const urls = genCubeUrls( '/images/skyboxsun/', '.jpg' );

    new Three.CubeTextureLoader().load(urls, (cubeTexture) => {
      cubeTexture.encoding = Three.sRGBEncoding
      scene.background = cubeTexture
    })

    // const cube = new Three.Mesh(new Three.BoxGeometry(100,100,100), new Three.MeshBasicMaterial({color: 0xff00ff}))

    // scene.add(cube)

    const groundGroup = new Three.Group()

    // 草坪
    const gassGroup = new Three.Group()
    const plane1 = new Three.Mesh(new Three.PlaneGeometry(100, 50), new Three.MeshPhongMaterial({ color: 0x61974b, side: Three.DoubleSide}))
    plane1.rotation.x = -0.5 * Math.PI
    plane1.position.z = -25

    const plane2 = new Three.Mesh(new Three.PlaneGeometry(100, 50), new Three.MeshPhongMaterial({ color: 0xb1d744, side: Three.DoubleSide }))
    plane2.rotation.x = -0.5 * Math.PI
    plane2.position.z = 25
    gassGroup.add(plane1, plane2)

    // 马路
    const roadGroup = new Three.Group()

    const roadG = new Three.PlaneGeometry(30, 100)
    const roaddM = new Three.MeshBasicMaterial({ color: 0x4c4a4b })
    const roadPlane = new Mesh(roadG, roaddM)

    // 实线
    const leftLine = new Three.Mesh(new Three.PlaneGeometry(2, 100), new Three.MeshBasicMaterial({ color: 0xffffff }))
    leftLine.position.x = -12
    leftLine.position.z = 0.2

    const rightLine = leftLine.clone()
    rightLine.position.x = 12
    rightLine.position.z = 0.2

    //虚线
    const dashLine = new Three.Group()
    for (let i = 0; i < 13; i++) {
      const dash = new Mesh(new Three.PlaneGeometry(2, 4), new Three.MeshBasicMaterial({ color: 0xffffff }))
      dash.position.y = (2 * i * 4)
      dashLine.add(dash)
    }
    dashLine.position.y = -47
    dashLine.position.z = 0.2

    roadGroup.add(roadPlane, leftLine, rightLine, dashLine)

    roadGroup.rotation.x = -0.5 * Math.PI
    roadGroup.position.y = 0.2

    // 两侧树
    const treeGroup = new Three.Group()
    const leftTreeLine = new Three.Group()

    for (let i = 0; i < 7; i++) {
      // 树
      const tree = new Three.Group()
      // 树干
      const trunk = new Mesh(new Three.CylinderGeometry(1, 1, 8, 100), new Three.MeshBasicMaterial({ color: 0x7a5753 }))
      // 树盖
      const big = new Mesh(new Three.CylinderGeometry(0, 5, 5, 6), new Three.MeshBasicMaterial({ color: 0x64a525 }))
      const small = new Mesh(new Three.CylinderGeometry(0, 4, 3, 6), new Three.MeshBasicMaterial({ color: 0x64a525 }))

      const shadow = new Mesh(new Three.CircleGeometry(4.4, 6), new Three.MeshBasicMaterial({ color: 0x3f662d }))
      big.position.y = 3
      small.position.y = 5
      shadow.rotation.x = -0.5 * Math.PI
      shadow.position.y = -3.9
      tree.add(trunk, big, small, shadow)
      tree.position.z = (2 * i * 8)
      leftTreeLine.add(tree)
    }
    leftTreeLine.position.x = -20
    const rightTreeLine = leftTreeLine.clone()
    rightTreeLine.position.x = 20
    treeGroup.add(leftTreeLine, rightTreeLine)
    treeGroup.position.y = 4
    treeGroup.position.z = -47

    const buildingGroup = new Three.Group()
    const buildingNum = 20
    const buildingMaterial = new Three.MeshPhongMaterial({ color: 0x6667ab, shininess: 0 })
    for (let i = 0; i < buildingNum; i++) {
      const width = Math.random() * 25
      const height = Math.random() * 25
      const deep = Math.random() * 10
      const buildingGeometry = new Three.BoxGeometry(width, height, deep)
      const mesh = new Three.Mesh(buildingGeometry, buildingMaterial)
      mesh.position.x = -100 / 2 + i * 2 + (Math.random() * 30) * 3
      mesh.position.z = -100 / 2
      mesh.position.y = height / 2
      buildingGroup.add(mesh)
    }

    //************************************************
    //云朵
    cloudGroup = new Three.Group()
    const cloudMaterial = new Three.MeshBasicMaterial({color: 0xffffff})
    const cloud1 = new Three.Mesh(new Three.SphereGeometry(6), cloudMaterial)
    const cloud2 = new Three.Mesh(new Three.SphereGeometry(8), cloudMaterial)
    const cloud3 = new Three.Mesh(new Three.SphereGeometry(5), cloudMaterial)
    const cloud4 = new Three.Mesh(new Three.SphereGeometry(7), cloudMaterial)
    const cloud5 = new Three.Mesh(new Three.SphereGeometry(5), cloudMaterial)
    const cloud6 = new Three.Mesh(new Three.SphereGeometry(5), cloudMaterial)

    cloud1.position.x = 2
    cloud2.position.z = 4
    cloud3.position.x = -3
    cloud4.position.y = -2
    cloud4.position.x = -2
    cloud5.position.x = 6
    cloud6.position.x = -6


    cloudGroup.add(cloud1, cloud2, cloud3, cloud4, cloud5, cloud6)
    cloudGroup.position.z = -200 / 2 - 2
    cloudGroup.position.y = 30

    groundGroup.add(roadGroup, gassGroup, roadGroup, treeGroup, buildingGroup, cloudGroup)

    scene.add(groundGroup)
    // 渲染器
    renderer = new WebGLRenderer()

    renderer.setSize(width, height)
    renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)


    // 控制器
    controls = new OrbitControls(camera, renderer.domElement)
  }

  function render() {
    renderer.render(scene, camera);
    controls.update()
  }


  const clock = new Three.Clock()
  function animate() {
    const time = clock.getElapsedTime()
    requestAnimationFrame(animate);
    render()
    cloudGroup.position.x = Math.sin(time / 3) * 25
  }
  return {
    init,
    animate,
  }
}

