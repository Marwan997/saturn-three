uniform sampler2D saturnTexture;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    float intensity = normalize(1.0- dot(vNormal, vec3(0.0,0.0,1.0)));
    vec3 atmosphere = vec3(0.7, 0.6, 0.4) * pow(intensity, 1.2);
    gl_FragColor = vec4(atmosphere*texture2D(saturnTexture, vUv).xyz , 1.0);
}

