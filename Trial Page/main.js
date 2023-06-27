import './style.css'

import * as THREE from 'three' ;

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

/* Need 3 things, Scene, Camera, Renderer */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera /* Mimic what human eyes see */ ( 75 /* field of view */, 
/* Aspect Ratio */ window.innerWidth / window.innerHeight, /* View Frustrum (What the camera can see) */0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( Window.devicePixelRation );
renderer.setSize(window.innerWidth, window.innerHeight );
camera.position.setZ(30);

const geometry = new THREE.CapsuleGeometry(10, 10, 16, 100);
const material = new THREE.MeshStandardMaterial({ color:"white"});
const pill1 = new THREE.Mesh( geometry, material);

const pillTexture = new THREE.TextureLoader().load('pill.png');
const normalMap = new THREE.TextureLoader().load('norm.png');

const spaceTexture = new THREE.TextureLoader().load('spacegoburr.jpg');

const pill = new THREE.Mesh(
  new THREE.CapsuleGeometry(10, 10, 16, 100),
  new THREE.MeshBasicMaterial( {map: spaceTexture, normalMap })
);

scene.add(pill);

const pointlight = new THREE.PointLight("red", 10);
pointlight.position.set(20,20,20);

const pointlight1 = new THREE.PointLight("green", 10);
pointlight1.position.set(-20, 20, 20);

const ambientLight = new THREE.AmbientLight("white", 0.01);
scene.add(pointlight, pointlight1, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointlight)
const lightHelper1 = new THREE.PointLightHelper(pointlight1)
const gridHelper = new THREE.GridHelper(200 ,50);
scene.add(lightHelper, lightHelper1);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 25, 24,24, 1000);
  const material = new THREE.MeshStandardMaterial ( {color: "white"});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread (200) );

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);




const controls = new OrbitControls (camera, renderer.domElement)

scene.add(pointlight);

function animate() {  /* Animation loop so that the render function does have to kept being called */
  requestAnimationFrame( animate);

  pill.rotation.x += 0.001;
  pill.rotation.y += 0.001;
  pill.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera);
}

animate()

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera