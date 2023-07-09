varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;

void main () {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    float stripesY = smoothstep(0.01, 0.5, mod(vUv.y * 20.0, 1.0));
    float stripesX = (vUv.x);

    float strength = stripesY * stripesX;


    vPosition.z +=  sin(vPosition.y * strength + uTime * 0.8) * 10.0;

    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0); 
}
