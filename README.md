# Simple-AR
<img src="img/screenshot.gif" title="screen capture" alt="screen capture" width="250" style="text-align: center">

### **Description / Rationale**
Simple AR is a web-based image tracking library (platform) based on WebAssembly. Unlike other web-based AR libraries it: 
* allows loading image targets without training;
* recognizes partially visible targets;
* can recognize target at a greater distance. 

### **Instructions**
In order to use it, attach "simple-ar" to a-entity. The library (platform) has the following attributes (new attributes will be added in the process of development): 
* <b>src: { type: "string" }</b> - The URL or source of image target. Can be .jpg or .png file. 
* <b>minCutOffValue: { type: "float", default: 0.01 }</b> - One Euro Filter related parameter for smoothing the tracking.
* <b>betaValue: { type: "float", default: 0.1 }</b> - One Euro Filter related parameter for smoothing the tracking.
* <b>dCutOffValue: { type: "float", default: 0.001 }</b>- One Euro Filter related parameter for smoothing the tracking.

The code below shows the sample implementation:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Simple AR - A Web based AR for A-Frame</title>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
  </head>
  <body>
    <script
      src="https://cdn.jsdelivr.net/gh/akbartus/Simple-AR/dist/0.1.2/simple-ar.min.js"
      onload="onWasmLoaded();"
    ></script>
    <a-scene>
      <a-entity simple-ar="src: img/target.jpg; minCutOffValue: 1; betaValue:0.1;">
        <a-plane
          position="0 0 0"
          rotation="0 0 0"
          width="1"
          height="1"
          material="src: https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"
        ></a-plane>
      </a-entity>
      <a-camera position="0 0 0"></a-camera>
    </a-scene>
  </body>
</html>

```
Please note: Current version only supports single image tracking. Sample target, used in this example can be found <a href="img/target.jpg">here</a>. In order to improve smoothness of tracking to the desired level, play with One Euro filter values.

### **Events Handling**
The library has the following events:
* <b>targetFound</b>: Triggered when the target image is found by Simple AR.
```js
document.addEventListener("targetFound", function (event) {
    console.log("Target found!");
});
```
* <b>targetLost</b>: Triggered when the target image is lost by Simple AR.
```js
document.addEventListener("targetLost", function (event) {
    console.log("Target lost!");
});
```
* <b>onVideoStarted</b>: Triggered when webcamera video is started.
```js
document.addEventListener("onVideoStarted", () => {
    console.log("video started!");
});
```
* <b>arPause</b>: A toggle, which lets pause tracking system or unpause.
```js
const pauseButton = document.createElement("button");
pauseButton.setAttribute("style", "position: absolute; left:10px; top:10px; z-index:3");
pauseButton.textContent = "Pause";
pauseButton.addEventListener("click", arPause); // call here
document.body.appendChild(pauseButton);
```
* <b>onDistance</b>: Show distance between camera and image target.
```js
document.addEventListener("onDistance", (event) => {
 const distance = event.detail;
 console.log("Distance:", distance);
});
```

### **Version**
Most current version is 0.1.2.

### **Updates / Bug Fixes**
Please note that the work on this library (platform) is in progress. Future updates:
* <del>Adding "onDistance" event, which will let measuring distance between camera and AR target and trigger interactive events</del>.
* <del>Fixing rotation bug</del>.
* <del>Fixing positioning bug</del>.
* <del>Fixing centering issue</del>.
* <del>Full Babylon.js example created</del>.
* <del>Full Three.js example created</del>.
* Adding runtime target image loading feature.
* <del>Adding a computer vision example for reading/segmenting texture of image target on a screen.</del>
* Adding interactive examples.
* Adding Unity support (Unity WebGL exporter).
* Adding React example.

### **Tech Stack**
The library(platform) is powered by AFrame, Three.js and WebAssembly (Emscripten). One Euro Filter was taken/adapted from the following sources ( https://github.com/hiukim/mind-ar-js/blob/master/src/libs/one-euro-filter.js, https://jaantollander.com/post/noise-filtering-using-one-euro-filter/#mjx-eqn%3A1).
The library(platform) is compatible with latest version of A-Frame (1.4.2). Tests with older versions of A-Frame were not perfomed yet.

Example implementation of Simple AR is also given for Three.js and Babylon.js (see "other_frameworks" folder).   

### **Demo**
See A-Frame demo here: [Demo](https://webar-simple.glitch.me/)

See ThreeJs demo here: [Demo](https://simplear-threejs.glitch.me/)

See BabylonJs demo here: [Demo](https://simplear-babylonjs.glitch.me/)

See a computer vision example for reading/segmenting texture of image target on a screen here: [Demo](https://webarcoloring-simplear.glitch.me/). Get image target <a href="https://github.com/akbartus/WebAR-Coloring/blob/main/img/target_3d.jpg">here</a>. For further guidance refer <a href="https://github.com/akbartus/WebAR-Coloring">to this repository.</a>  
