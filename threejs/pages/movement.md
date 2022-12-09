# Movement 运动

#### 不断做object的transform的变换
<div grid="~ cols-2 gap-4" m="-t-2">
<div>

```javascript
  ...
  setInterval(() => {
    object.rotation.x += 0.01
  }, 1000/ 60)
  // 60hz 增加角度 60 * 0.01 = 0.6
  // 120hz 120 * 0.01 = 1.2 导致不同的刷新率不一致，旋转快慢不一致
```
```javascript
  ...
  const clock = new Three.Clock()
  function animate() {
    requestAnimationFrame( animate );
    const time = clock.getElapsedTime()
    object.rotation.x = (time * 10) / 180 * Math.PI
    object.position.x = Math.sin(time) * 10
    renderer.render( scene, camera );
  }
```
</div>

<ThreeJs type="MOVEMENT" />
</div>

<!--
1. 第一个想到的就是 setInterval 来做周期性的变化
2. 为了处理不同刷新率屏幕带来的问题，一般用requestAnimationFrame来递归调用。
3. 然后取当前时间来做变化
-->