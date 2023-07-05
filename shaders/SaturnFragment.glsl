uniform sampler2D saturnTexture;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec3 atmosphere = vec3(1.0, 0.91, 0.95);
    gl_FragColor = vec4(atmosphere*texture2D(saturnTexture, vUv).xyz , 1.0);
}

