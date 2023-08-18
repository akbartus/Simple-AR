
  ///////////////////////////////////////////////////////////
  ///// Main Part                                        ////
  ///////////////////////////////////////////////////////////
    
  var canvas = document.getElementById("renderCanvas");
  var engine = null;
  var scene = null;
  var sceneToRender = null;
  var createDefaultEngine = function () {
    return new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false,
    });
  };
  var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.DeviceOrientationCamera(
      "camera1",
      //new BABYLON.Vector3(0, 5, -10),
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.minZ = 0.1;
  
    // This targets the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());
  
    // This attaches the camera to the canvas
    //camera.attachControl(canvas, true);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.8;
  
    // Our built-in 'sphere' shape.
    // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
  
    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;
  
    // Our built-in 'ground' shape.
    // var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    let size = 0.25;
    const box = BABYLON.Mesh.CreateBox("box", size, scene);
    window.cloudTarget = new BABYLON.TransformNode("cloudTarget");
    box.parent = cloudTarget;
  
    return scene;
  };
  window.initFunction = async function () {
    var asyncEngineCreation = async function () {
      try {
        return createDefaultEngine();
      } catch (e) {
        console.log(
          "the available createEngine function failed. Creating the default engine instead"
        );
        return createDefaultEngine();
      }
    };
  
    window.engine = await asyncEngineCreation();
    if (!engine) throw "engine should not be null.";
    window.scene = createScene();
  };
  initFunction().then(() => {
    sceneToRender = scene;
    engine.runRenderLoop(function () {
      if (sceneToRender && sceneToRender.activeCamera) {
        sceneToRender.render();
      }
    });
  });
  
  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
  
  const updateARObject = function (transformationMatArray, groundPlaneEnabled) {
    var rotMat = new BABYLON.Matrix.FromArray(transformationMatArray);
    var rotQuaternion = new BABYLON.Quaternion.FromRotationMatrix(rotMat);
  
    var qCorrected = new BABYLON.Quaternion(
      -rotQuaternion.x,
      rotQuaternion.y,
      -rotQuaternion.z,
      rotQuaternion.w
    );
    var qInverse = BABYLON.Quaternion.Inverse(qCorrected);
  
    if (cloudTarget) {
      if (!groundPlaneEnabled) {
        cloudTarget.rotationQuaternion = qInverse;
      }
  
      cloudTarget.position = new BABYLON.Vector3(
        transformationMatArray[3],
        -transformationMatArray[7],
        transformationMatArray[11]
      );
    }

  };
  