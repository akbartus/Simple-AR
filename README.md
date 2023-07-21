# Simple-AR
<img src="img/screenshot.gif" title="screen capture" alt="screen capture" height="250">

### **Description / Rationale**
Simple AR is a web-based image tracking library based on WebAssembly, which let's loading image targets without training. Unlike other web-based AR libraries it allows loading image targets without training and it is completely free!
This is the A-Frame component for post-processing effects, which are based on the examples provided by Three.js and other sources (see Tech Stack section for more information). The component makes use of Effect Composer and lets compose effects in the same way as it is done in Three.js.


### **Instructions**
In order to use the component attach "post-processing" to a-scene. The component has the following attributes: 
* <b>effect: { type: "string", default: "sketchy-pencil" }</b> - It allows to set the effect type. One of the following effects could be set: sketchy-pencil, halftone, old-film, pixel, glitch, sobel, bloom, dot-screen, volumetric-light, afterimage, bad-tv. 
    
* <b>halftoneParams: { type: "string", default: "shape: 1, radius: 6, rotateR: Math.PI / 12, rotateB: (Math.PI / 12) * 2, rotateG: (Math.PI / 12) * 3, scatter: 1, blending: 1, blendingMode: 1, greyscale: false, disable: false" }</b> - The parameters for halftone effect. Accepts the following in string format and is written together: shape, radius, rotateR, rotateB, rotateG, scatter, blending, blendingMode, greyscale, disable.
    
* <b>oldFilmParams: { type: "string", default: "grayscale: true, nIntensity: 0.3, sIntensity: 0.3, sCount: 256" }</b> - The parameters of old film effect. Accepts the following in string format and is written togeter: grayscale, nIntensity, sIntensity, sCount.

* <b>pixelParams: { type: "string", default: "pixelSize: 12, normalEdgeStrength: 0.35, depthEdgeStrength: 0.4" }*</b> - The parameters of pixel effect. Accepts the following: pixelSize, normalEdgeStrength, depthEdgeStrength.

* <b>glitchParams: { type: "string", default: "goWild: false, enabled: true" }</b> - The parameters of glitch effect. Accepts the following: goWild, enabled. 

* <b>sobelParams: { type: "string", default: "enabled: true" }</b> - The parameters of Sobel effect. Accepts only "enabled" parameter.

* <b>bloomParams: { type: "string", default: "threshold: 0, strength: 0.4, radius: 0, exposure: 1" }</b> - The parameters of bloom effect. Accepts the following: threshold, strength, radius and exposure.

* <b>dotScreenParams: { type: "string", default: "scale: 4, angle: 90" }</b> - The parameters of dotscreen effect. Accepts the following: scale and angle. 

* <b>volumetricLightParams: { type: "string", default: "decay: 0.95, density: 0.5, exposure: 0.2, samples: 50" }</b> - The parameters of volumetric light effect. Accepts the following: decay, density, exposure, samples.

* <b>afterimageParams: { type: "string", default: "damp: 0.8" } </b> - The parameters of afterimage effect. Accepts only damp parameter. 

* <b>badTVParams: { type: "string", default: "mute: true, show: true, distortion: 1.0, distortion2: 1.0, speed: 0.2, rollSpeed: 0" }*</b> - The parameters of bad TV effect. Accepts the following: mute, show, distortion, distortion2, speed, rollSpeed.

<b>* Please note:</b> The individual effects of pixel and badTV do not work properly in VR mode yet.  

The code below shows the sample implementation of the component:
```
<html lang="en">
<head>
    <title>A-Frame Component: Post-Processing</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script src="https://cdn.jsdelivr.net/gh/akbartus/A-Frame-Component-Postprocessing/dist/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/akbartus/A-Frame-Component-Postprocessing/dist/post-processing.min.js"></script>
</head>
<body>
    <a-scene post-processing="effect: bloom" >
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
        <a-entity light="type: directional; color: #fff;" position="1 1 1"></a-entity>
        <a-sky color="#000"></a-sky> 
    </a-scene>
</body>
</html>
```

### **Updates**
Please note that the work on this component is still in progress. Future updates will include:
* Possibility of adding custom effects.
* New effects, created by Three.js community.

### **Tech Stack**
The project is powered by AFrame and Three.js. The effects and corresponding examples were adapted from Three.js library as well as other sources:
* Halftone, Pixelation, Glitch, Sobel, Dot Screen, Old Film, Afterimage - https://threejs.org/examples/?q=postprocessing.
* Sketchy Pencil - https://tympanus.net/codrops/2022/11/29/sketchy-pencil-effect-with-three-js-post-processing/.
* Volumetric light (God-rays) - https://github.com/abberg/three-volumetric-light.
* Bad TV - https://github.com/felixturner/bad-tv-shader.

Updated version of A-Frame (1.4.2) is used, which takes into account webXR. The updates to A-Frame and respective passes/shaders were made based on CodyJasonBennett's suggested changes to Three.js and taken from <a href="https://github.com/mrdoob/three.js/pull/26160">here</a> with indivudual changes made to <a href="https://github.com/CodyJasonBennett/three.js/commit/9719d00d36467508b4e36b8097908648e1f368b3">three.js</a> files. The VR mode was tested with Meta Quest 2 Headset. Tests using  other headsets are welcomed. 

A small hack allowing the support of Three.js based post-processing in A-Frame, was taken from the following <a href="https://stackoverflow.com/questions/68991451/is-there-a-way-to-implement-the-three-js-effect-composer-into-aframe-with-vr-mod">source</a>.  

The following shaders and passes were integrated into component and can be accessed when creating custom effects (separate attribute with custom-effect will be added in next release):
* Copy Shader, Pencil Lines Material Shader, Halftone Shader, Film grain & scanlines shader, Vignette Shader, Gamma Correction Shader, Digital Glitch Shader, Luminosity Shader, Sobel Operator Shader, Luminosity High Pass Shader, Output Shader, RGB Shift Shader, Dot Screen Shader, VolumetericLightShader, Afterimage shader, BadTVShader, Static Shader.
* Pass, Shader Pass, Mask Pass, Effect Composer, Render Pass, Pencil Lines Pass, Halftone Pass, Film Pass, Render Pixelated Pass, Glitch Pass, Unreal Bloom Pass, Output Pass, Clear Pass, Texture Pass, AfterImage Pass.
        
### **Demo**
See demo of the component here: [Demo](https://post-processing.glitch.me/)
