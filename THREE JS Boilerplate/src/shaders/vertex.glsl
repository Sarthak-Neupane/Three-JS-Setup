uniform float time;
uniform float uProgress;
varying vec2 vUv;
varying vec3 vNormal;

void main()
{
    vUv = uv;
    vNormal = normal;
    vec3 newPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0 );
}