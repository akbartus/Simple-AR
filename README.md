# Simple-AR
<img src="img/screenshot.gif" title="screen capture" alt="screen capture" width="250" style="text-align: center">

### **Description / Rationale**
Simple AR is a web-based image tracking library (component) based on WebAssembly and made for A-Frame framework. Unlike other web-based AR libraries it allows loading image targets without training, recognizes partially visible targets and it is completely free!

### **Instructions**
In order to use it, attach "simple-ar" to a-entity. The library (component) has the following attributes (new attributes will be added in the process of development): 
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
            <a-torus></a-torus>
        </a-entity>
        <a-camera position="0 0 0"></a-camera>
    </a-scene>
</body>
</html>
```
Please note: Current version only supports single image tracking. Sample target, used in this example can be found <a href="img/target.jpg">here</a>. In order to improve smoothness of tracking to the desired level, play with One Euro filter values.

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
### **Version**
Most current version is 0.1.0.

### **Updates**
Please note that the work on this library (component) is in progress. Future updates.
* Adding "onDistance" event, which will let measuring distance between camera and AR target and trigger interactive events.
* Adding runtime target image loading feature.
* Adding a computer vision example for reading/segmenting texture of image target on a screen.
* Adding interactive examples.

### **Tech Stack**
The project is powered by AFrame, Three.js and WebAssembly (Emscripten, Asm.js). One Euro Filter was taken/adapted from the following sources ( https://github.com/hiukim/mind-ar-js/blob/master/src/libs/one-euro-filter.js, https://jaantollander.com/post/noise-filtering-using-one-euro-filter/#mjx-eqn%3A1).
The component is compatible with latest version of A-Frame (1.4.2). Tests with older versions of A-Frame were not perfomed yet.

### **Demo**
See demo here: [Demo](https://webar-simple.glitch.me/)
