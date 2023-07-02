import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import ringVertexShader from './shaders/RingVertex.glsl'
import ringFragmentShader from './shaders/RingFragment.glsl'

import SaturnVertexShader from './shaders/SaturnVertex.glsl'
import SaturnFragmentShader from './shaders/SaturnFragment.glsl'

import SaturnGlowVertexShader from './shaders/SaturnGlowVertex.glsl'
import SaturnGlowFragmentShader from './shaders/SaturnGlowFragment.glsl'


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
    );


camera.position.z = -14;

const renderer = new THREE.WebGLRenderer({
    antialias: true
});


renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize( window.innerWidth,
        window.innerHeight )

const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild(renderer.domElement);

const planet = new THREE.Group();



const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.2, 1000, 1000),
    new THREE.ShaderMaterial({
        vertexShader: ringVertexShader, 
        fragmentShader: ringFragmentShader,
        side: THREE.DoubleSide,
        wireframe: false,
        uniforms: {
            uTime: {value: 0},
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
)
ring.scale.z = 0.5
ring.scale.set(5,5,0.5)
ring.rotation.x = 1.4
ring.rotation.y = 0.1

scene.add(ring)

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50,50),
    new THREE.ShaderMaterial({
        vertexShader: SaturnVertexShader,
        fragmentShader: SaturnFragmentShader,
        uniforms: {
            saturnTexture: {
                value: new THREE.TextureLoader().load('./textures/globe.jpeg')
            }
        }

    })
)
saturn.rotation.x = 6.1
saturn.rotation.z = 0.1

scene.add(saturn)

const saturnGlow = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50,50),
    new THREE.ShaderMaterial({
        vertexShader: SaturnGlowVertexShader,
        fragmentShader: SaturnGlowFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide

    })
)

saturnGlow.scale.set(1.1,1.1,1.1);

scene.add(saturnGlow)

const star = new THREE.BufferGeometry();
const starMat = new THREE.PointsMaterial({color: 0xFFFFFF})

const starPos = [];


const stars = new THREE.Points(
    star,
    starMat
);
scene.add(stars); 

for(let i = 0 ; i < 1000 ; i++){
     const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z =  (Math.random() - 0.5) * 2000;
    starPos.push(x,y,z);
}

star.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))

const clock = new THREE.Clock();

function animate (){

    const elapsedTime = clock.getElapsedTime();
    requestAnimationFrame(animate);
    ring.rotation.z -= 0.0000001
    saturn.rotation.y -= 0.001

    saturn.position.y = Math.sin(elapsedTime) * 0.2
    saturnGlow.position.y = Math.sin(elapsedTime) * 0.2
    ring.position.y = Math.sin(elapsedTime) * 0.2

    controls.update();

    renderer.render(scene, camera);
}

animate();