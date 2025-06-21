import { selectFile } from "./messaging.js";
import { createProgram } from "./shader.js";
/**
 *
 */
const RunShaderPreview = (vertexShaderSource, fragmentShaderSource) => {
    const canvas = document.getElementById("glcanvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        throw new Error(`Web GL not supported`);
    }
    const btn = document.getElementById("selectBtn");
    if (btn) {
        btn.addEventListener("click", (e) => {
            console.log("button clicked to select file");
            selectFile();
        });
    }
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
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
};
export { RunShaderPreview };
