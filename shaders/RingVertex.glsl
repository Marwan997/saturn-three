
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;

void main () {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    float stripesY = smoothstep(0.1, 0.5, mod(vUv.y * 70.0, 0.5));
    float stripesX = sin(vUv.x * 1.0);

    float strength = stripesY * stripesX;


    vPosition.z += 1.5 - (sin(vPosition.y * strength + uTime * 0.4));

    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0); 
}
