import { fragmentShaderSample } from "../sample/frag.js";
import { vertexShaderSample } from "../sample/vert.js";
import { Vector3 } from "../utils/vector.js";
import { selectFile } from "./messaging.js";
import { lookAt, makePerspective } from "./scene/camera.js";
import {
  createAndBindBuffer,
  cubeIndices,
  cubeVertices,
} from "./scene/default_shapes.js";
import { createProgram } from "./shader.js";

type Nullable<T> = T | null;

function createAndUseProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
) {
  const program = createProgram(gl, vertexSource, fragmentSource);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const infoLog = gl.getProgramInfoLog(program);

    console.error(`Program link error :${infoLog}`);
    throw new Error(`Program  link error ${infoLog}`);
  }

  gl.useProgram(program);

  return program;
}
function setUniformMatrices(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  projectionMatrix: Float32Array,
  viewMatrix: Float32Array
) {
  const uProjection = gl.getUniformLocation(program, "uProjection");
  const uView = gl.getUniformLocation(program, "uView");

  gl.uniformMatrix4fv(uProjection, false, projectionMatrix);
  gl.uniformMatrix4fv(uView, false, viewMatrix);
}

/**
 *
 */
const RunShaderPreview = (
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  const canvas = document.getElementById("glcanvas") as HTMLCanvasElement;
  const gl: Nullable<WebGLRenderingContext> = canvas!.getContext("webgl");

  if (!gl) {
    throw new Error(`Web GL not supported`);
  }

  const btn = document.getElementById("selectBtn") as HTMLButtonElement;
  if (btn) {
    btn.addEventListener("click", (e) => {
      console.log("button clicked to select file");
      selectFile();
    });
  }

  const projectionMatrix = makePerspective(Math.PI / 4, 4 / 3, 0.1, 100);
  const viewMatrix = lookAt(
    Vector3({ x: 0, y: 0, z: 0 }),
    Vector3({ x: 0, y: 0, z: 20 }),
    Vector3({ x: 0, y: 1, z: 0 })
  );

  console.log(projectionMatrix, viewMatrix);

  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const program = createAndUseProgram(
    gl,
    vertexShaderSample,
    fragmentShaderSample
  );
  setUniformMatrices(gl, program, projectionMatrix, viewMatrix);
  createAndBindBuffer(gl, cubeVertices, cubeIndices, program);
  gl.drawElements(gl.LINES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);
};

export { RunShaderPreview };
