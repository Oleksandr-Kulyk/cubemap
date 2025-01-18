import {
  AmbientLight,
  AnimationMixer,
  Box3,
  BoxGeometry,
  BoxHelper,
  Clock,
  Color,
  CubeTextureLoader,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();
const loader = new CubeTextureLoader();
const textures = loader.load([
  "/cubemap/textures/posx.jpg",
  "/cubemap/textures/negx.jpg",
  "/cubemap/textures/posy.jpg",
  "/cubemap/textures/negy.jpg",
  "/cubemap/textures/posz.jpg",
  "/cubemap/textures/negz.jpg",
]);
scene.background = textures;
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 15);
camera.lookAt(0, 0, 0);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = (Math.PI / 180) * 70;
controls.update();

const modelLoader = new GLTFLoader();
let mixer = null;
modelLoader.load("/models/CesiumMan.gltf", (data) => {
  const model = data.scene;
  mixer = new AnimationMixer(model);
  const animation = mixer.clipAction(data.animations[0]);
  animation.play();
  scene.add(model);
  model.scale.set(5, 5, 5);
});

const ambientLight = new AmbientLight("white", 0.6);
scene.add(ambientLight);

const clock = new Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }
  controls.update();
  renderer.render(scene, camera);
}

animate();
