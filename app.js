import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import ringVertexShader from './shaders/RingVertex.glsl'
import ringFragmentShader from './shaders/RingFragment.glsl'

import SaturnVertexShader from './shaders/SaturnVertex.glsl'
import SaturnFragmentShader from './shaders/SaturnFragment.glsl'

import SaturnGlowVertexShader from './shaders/SaturnGlowVertex.glsl'
import SaturnGlowFragmentShader from './shaders/SaturnGlowFragment.glsl'

import StarVertex from './shaders/StarVertex.glsl'
import StarFragment from './shaders/StarFragment.glsl'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
    );
camera.position.z = 15;
camera.position.y = 0;

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight )
const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild(renderer.domElement);

/** Ring */
const ring = new THREE.Mesh(
    new THREE.TorusGeometry(4, 0.5, 256, 256),
    new THREE.ShaderMaterial({
        vertexShader: ringVertexShader, 
        fragmentShader: ringFragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: {
            uTime: {value: 0.0}
        }
    })
)
ring.scale.set(2,2,0.01)
ring.rotation.x = 4.9
ring.rotation.y =  0.05
scene.add(ring)

/** Saturn */
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
saturn.rotation.x =  0.2
saturn.rotation.z = 0
scene.add(saturn)
/** Saturn Glow */
const saturnGlow = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50,50),
    new THREE.ShaderMaterial({
        vertexShader: SaturnGlowVertexShader,
        fragmentShader: SaturnGlowFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,

    })
)
saturnGlow.scale.set(1.1,1.1,1.1);
scene.add(saturnGlow)


/** Stars */
const starGeometry = new THREE.PlaneGeometry(5,5);
const starMaterial = new THREE.ShaderMaterial({
    vertexShader: StarVertex,
    fragmentShader: StarFragment,
    side: THREE.DoubleSide,
})
const stars = new THREE.Group();

for(let i = 0 ; i < 1000 ; i++){
    const star = new THREE.Mesh(
        starGeometry,
        starMaterial
    )
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z =  (Math.random() - 0.5) * 2000;
    star.position.x = x;
    star.position.y = y;
    star.position.z = z;
    stars.add(star);
}
scene.add(stars);

/** Animation */
const clock = new THREE.Clock();
function animate (){

    const elapsedTime = clock.getElapsedTime();
    requestAnimationFrame(animate);
    ring.rotation.z -= 0.0000001
    saturn.rotation.y -= 0.001

    saturn.position.y = Math.sin(elapsedTime) * 0.3
    saturnGlow.position.y = Math.sin(elapsedTime) * 0.3
    ring.position.y = Math.sin(elapsedTime) * 0.3

    ring.material.uniforms.uTime.value = Math.abs(Math.sin(elapsedTime)) * 1;

    controls.update();

    renderer.render(scene, camera);
}
animate();
