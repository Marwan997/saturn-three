varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = 0.01 - pow(1.0 - abs(dot(viewDirection, vNormal)), 0.3);

    vec3 atmosphere = vec3(1.0, 0.95, 0.85);

    gl_FragColor = vec4(vec3(fresnel) + atmosphere, 1.0);
}
