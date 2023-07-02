
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vPattern;

uniform float uTime;

void main () {
    vUv = uv;
    vNormal = normal;
    vPosition = position;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0); 
}