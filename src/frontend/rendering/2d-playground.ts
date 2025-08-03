import { vertexShaderSample } from "../sample/vert2D.js";
import { createAndUseProgram } from "../shader/shader.js";

// Full-screen quad in clip space
const quadVertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
]);

const quadIndices = new Uint16Array([0, 1, 2, 2, 3, 0]);

function render2D(gl: WebGLRenderingContext, fragmentShaderSource: string) {
  const program = createAndUseProgram(
    gl,
    vertexShaderSample,
    fragmentShaderSource
  );

  console.log("shader", fragmentShaderSource);

  // Look up the attribute location
  const aPosition = gl.getAttribLocation(program, "aPosition");

  // Create and bind the vertex buffer
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

  // Create and bind the index buffer
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, quadIndices, gl.STATIC_DRAW);

  // Clear and draw
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);
  gl.drawElements(gl.TRIANGLES, quadIndices.length, gl.UNSIGNED_SHORT, 0);
}

export { render2D };
