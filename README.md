# Simple-AR
<img src="img/screenshot.gif" title="screen capture" alt="screen capture" height="250">

### **Description / Rationale**
Simple AR is a web-based image tracking library based on WebAssembly and made for A-Frame framework. Unlike other web-based AR libraries it allows loading image targets without training and it is completely free!

### **Instructions**
Simple AR is the component. In order to use it, attach "simple-ar" to a-entity. The component has the following attributes (new attributes will be added in the process of development): 
* <b>src: { type: "string" }</b> - The URL or source of image target. Can be .jpg or .png file. 
* <b>minCutOffValue: { type: "float", default: 0.01 }</b> - One Euro Filter related parameter for smoothing the tracking.
* <b>betaValue: { type: "float", default: 0.1 }</b> - One Euro Filter related parameter for smoothing the tracking.
* <b>dCutOffValue: { type: "float", default: 0.001 }</b>- One Euro Filter related parameter for smoothing the tracking.

The code below shows the sample implementation of the component:
```
<!DOCTYPE html>
<html>
<head>
    <title>Simple AR - A Web based AR for A-Frame</title>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/gh/akbartus/Simple-AR/dist/0.1.0/simple-ar.min.js" onload="onWasmLoaded();"></script>
    <a-scene>
        <a-entity simple-ar="src: img/target.jpg">
            <a-entity gltf-model="3d/Horse.glb" position="0 -0.5 0"rotation="0 90 0" scale="0.01 0.01 0.01"></a-entity>
        </a-entity>
        <a-camera position="0 0 0"></a-camera>
    </a-scene>
</body>
</html>
```

### **Events Handling**
The component has the following events:
* <b>targetFound</b>: Triggered when the target image is found by Simple AR.
```
document.addEventListener("targetFound", function (event) {
    console.log("Target found!");
});
```
* <b>targetLost</b>: Triggered when the target image is lost by Simple AR.
```
document.addEventListener("targetLost", function (event) {
    console.log("Target lost!");
});
```
* <b>onVideoStarted</b>: Triggered when webcamera video is started.
```
document.addEventListener("onVideoStarted", () => {
    console.log("video started!");
});
```
* <b>arPause</b>: A toggle, which let's pause tracking system or unpause.
```
const pauseButton = document.createElement("button");
pauseButton.setAttribute("style", "position: absolute; left:10px; top:10px; z-index:3");
pauseButton.textContent = "Pause";
pauseButton.addEventListener("click", arPause); // call here
document.body.appendChild(pauseButton);
```

### **Updates**
Please note that the work on this component is in progress. The future updates will be reflected here.
* Adding "onDistance" event, which will let measuring distance between camera and AR target and trigger interactive events.

### **Tech Stack**
The project is powered by AFrame, Three.js and WebAssembly (Emscripten Asm.js). The component is compatible with latest version of A-Frame (1.4.2). Tests with older versions of A-Frame were not perfomed yet.
The 3d model of a horse was developed by Артур Мигранов and taken via <a href="https://poly.pizza/m/b48xU1GsYOT">Poly Pizza</a>.

### **Demo**
See demo of the component here: [Demo](https://webar-simple.glitch.me/)
