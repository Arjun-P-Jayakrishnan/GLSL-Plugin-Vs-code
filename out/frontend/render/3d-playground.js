import { createAndUseProgram } from "../shader/shader";
import { Vector3 } from "../utils/vector";
import { lookAt, makePerspective } from "./scene/camera";
import { createAndBindBuffer, cubeIndices, cubeVertices, } from "./scene/default_shapes";
/**
 * @description Use for 3D only
 * @param gl gl layer
 * @param program shader program
 * @param projectionMatrix projection matrix
 * @param viewMatrix view matrix
 */
function setUniformMatrices(gl, program, projectionMatrix, viewMatrix) {
    const uProjection = gl.getUniformLocation(program, "uProjection");
    const uView = gl.getUniformLocation(program, "uView");
    gl.uniformMatrix4fv(uProjection, false, projectionMatrix);
    gl.uniformMatrix4fv(uView, false, viewMatrix);
}
function render3D(gl, vertexShaderSource, fragmentShaderSource) {
    const projectionMatrix = makePerspective(Math.PI / 4, 4 / 3, 0.1, 100);
    const viewMatrix = lookAt(Vector3({ x: 0, y: 0, z: 0 }), Vector3({ x: 0, y: 0, z: 20 }), Vector3({ x: 0, y: 1, z: 0 }));
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const program = createAndUseProgram(gl, vertexShaderSource, fragmentShaderSource);
    setUniformMatrices(gl, program, projectionMatrix, viewMatrix);
    createAndBindBuffer(gl, cubeVertices, cubeIndices, program);
    gl.drawElements(gl.LINES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);
}
export { render3D };
