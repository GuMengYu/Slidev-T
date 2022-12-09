# Three.js?

易于使用、轻量级、跨浏览器的通用 3D 库

1. 浏览器在 canvas 上实现了 WebGL 接口, 但 WebGL 的 API 比较底层, 简单的一个二维图形都需要 shader 着色器语言 [mdn demo](https://github.com/mdn/dom-examples/blob/main/webgl-examples/tutorial/sample2/webgl-demo.js)

```c
const fragment = `#version 300 es
precision highp float;
out vec4 FragColor;
void main() {
  FragColor = vec4(1, 0, 0, 1);
}
`;
```
2. 而threejs 只需要了解一些基本的概念就能搭建一个简单的场景，对在web绘制简单的3d场景很有帮助

3. 官网有大量的示例可以参考。