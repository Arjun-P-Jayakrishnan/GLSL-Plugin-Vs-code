const vertexSource = `
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
`;
const fragmentSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // red
    }
`;
export function Run() {
    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("glcanvas");
        if (!canvas) {
            console.error("Canvas not found");
        }
        console.log(canvas);
        const gl = canvas.getContext("webgl");
        if (!gl) {
            throw new Error(`Web Gl not supported`);
        }
        const program = createProgram(gl, vertexSource, fragmentSource);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(program));
            throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
        }
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 0, 1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
}
function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    if (!shader)
        return;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
function createProgram(gl, vertexSource, fragmentSource) {
    const vertShader = compileShader(gl, vertexSource, gl.VERTEX_SHADER);
    const fragShader = compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    return program;
}
