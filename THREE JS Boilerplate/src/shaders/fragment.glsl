uniform float time;
uniform float uProgress;
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vNormal;


void main ()
{
    vec4 texture = texture2D(uTexture, vUv);
    gl_FragColor = vec4(vUv, 0., 1.);
    gl_FragColor = texture;
}