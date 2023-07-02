varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = 0.02 - pow(1.0 - abs(dot(viewDirection, vNormal)), 1.4);

    vec3 atmosphere = vec3(0.7, 0.64, 0.3);

    gl_FragColor = vec4(vec3(fresnel) + atmosphere, 1.0);
}
