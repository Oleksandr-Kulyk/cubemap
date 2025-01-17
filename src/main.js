import {
  AmbientLight,
  Color,
  CubeTextureLoader,
  Mesh,
  MeshStandardMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();
const loader = new CubeTextureLoader();
const textures = loader.load([
  "/assets/textures/posx.jpg",
  "/assets/textures/negx.jpg",
  "/assets/textures/posy.jpg",
  "/assets/textures/negy.jpg",
  "/assets/textures/posz.jpg",
  "/assets/textures/negz.jpg",
]);
scene.background = textures;
console.log(scene.background);
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5); // Поставте камеру подалі, щоб вона могла бачити текстури
camera.lookAt(0, 0, 0);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const geometry = new OctahedronGeometry(1);
const material = new MeshStandardMaterial({
  color: "blue",
  roughness: 0.5,
  metalness: 0.5,
});
const octaHedron = new Mesh(geometry, material);
octaHedron.position.set(5, 5, 5);
scene.add(octaHedron);
const pointingLight = new PointLight("white", 6, 50);
pointingLight.position.set(4, 6, 4);
scene.add(pointingLight);
const lowPointingLight = new PointLight("white", 6, 50);
lowPointingLight.position.set(4, 4, 4);
scene.add(lowPointingLight);

const ambientLight = new AmbientLight("white", 0.6);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
  octaHedron.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
