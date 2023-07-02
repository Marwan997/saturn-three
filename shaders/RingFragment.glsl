

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPattern;

float noise(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec3 bcolor = vec3(1.0, 0.75, 0.6);
    float line = atan(vUv.y) * 0.1 + 0.5;
    float noiseOffset = noise(vUv.xy);
    float displacement = line * noiseOffset * 0.05;
    vec3 distortedPosition = vPosition + vNormal * displacement;
    float stripe = mod(distortedPosition.z * 20.0, 0.85) * 2.5;
    vec3 color = mix(bcolor, vec3(0.25), stripe);
    float fresnel = 1.5 - dot(normalize(vNormal), normalize(vPosition));
    vec3 glowColor = vec3(1.0, 0.59, 0.3);
    float glowIntensity = 0.03;
    color += glowColor * pow(fresnel, 3.5) * glowIntensity;

    gl_FragColor = vec4(color, 0.6);
}