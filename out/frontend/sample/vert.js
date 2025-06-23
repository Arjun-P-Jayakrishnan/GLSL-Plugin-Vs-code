export const vertexShaderSample = `

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;

attribute vec3 position;

void main() {
    gl_Position = uProjection*uView*vec4(position,1.0);
}
`;
