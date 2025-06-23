import { fragmentShaderSample } from "../sample/frag.js";
import { vertexShaderSample } from "../sample/vert.js";
import { Vector3 } from "../utils/vector.js";
import { selectFile } from "./messaging.js";
import { lookAt, makePerspective } from "./scene/camera.js";
import { createAndBindBuffer, cubeIndices, cubeVertices, } from "./scene/default_shapes.js";
import { createProgram } from "./shader.js";
function createAndUseProgram(gl, vertexSource, fragmentSource) {
    const program = createProgram(gl, vertexSource, fragmentSource);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const infoLog = gl.getProgramInfoLog(program);
        console.error(`Program link error :${infoLog}`);
        throw new Error(`Program  link error ${infoLog}`);
    }
    gl.useProgram(program);
    return program;
}
function setUniformMatrices(gl, program, projectionMatrix, viewMatrix) {
    const uProjection = gl.getUniformLocation(program, "uProjection");
    const uView = gl.getUniformLocation(program, "uView");
    gl.uniformMatrix4fv(uProjection, false, projectionMatrix);
    gl.uniformMatrix4fv(uView, false, viewMatrix);
}
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
    const projectionMatrix = makePerspective(Math.PI / 3, 4 / 3, 0.1, 100);
    const viewMatrix = lookAt(Vector3({ x: 0, y: 0, z: 0 }), Vector3({ x: 0, y: 0, z: 5 }), Vector3({ x: 0, y: 1, z: 0 }));
    console.log(projectionMatrix, viewMatrix);
    const program = createAndUseProgram(gl, vertexShaderSample, fragmentShaderSample);
    setUniformMatrices(gl, program, projectionMatrix, viewMatrix);
    createAndBindBuffer(gl, cubeVertices, cubeIndices, program);
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);
};
export { RunShaderPreview };
