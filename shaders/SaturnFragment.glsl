uniform sampler2D saturnTexture;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec3 atmosphere = vec3(0.749, 0.6275, 0.5059);
    gl_FragColor = vec4(atmosphere*texture2D(saturnTexture, vUv).xyz , 1.0);
}

