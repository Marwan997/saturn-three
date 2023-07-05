varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    float stripesY =  mod(vUv.y* 56.0, 0.5);
    float stripesX = 1.0 - sin(vUv.x * 0.01);

    float strength = stripesY * stripesX;
    vec2 newUv = vec2(stripesY,stripesX);
    strength /= cnoise(newUv) * 5.1;

    vec3 bcolor = vec3(0.98, 0.89, 0.75);
    vec3 color = mix(bcolor, vec3(0.25), strength);

    float fresnel1 =  1.0 - dot(vNormal, vPosition) * 0.3;
    float fresnel2 =  1.0 - dot(vNormal, vPosition) * 0.5;
    float fresnel = (fresnel1 * fresnel2) * 0.2;
    color *= fresnel;

    vec3 glowColor = vec3(0.9, 0.5, 0.5);
    float glowIntensity = 0.01;
    color += glowColor * pow(fresnel, 2.5) * glowIntensity;
    color += bcolor * vec3(0.98,0.89,0.75);
    
    gl_FragColor = vec4(color, 0.5);
}
