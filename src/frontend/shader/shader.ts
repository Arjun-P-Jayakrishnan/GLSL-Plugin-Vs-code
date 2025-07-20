function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
) {
  const shader = gl.createShader(type);

  if (!shader) return;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  // console.log(shader, source);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = document.getElementById("error-text") as HTMLElement;

    error.innerText = "Program link error:" + gl.getShaderInfoLog(shader);
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram {
  // console.log("vertex");
  const vertShader = compileShader(gl, vertexSource, gl.VERTEX_SHADER);
  // console.log("fragment");
  const fragShader = compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

  const program = gl.createProgram();
  gl.attachShader(program, vertShader!);
  gl.attachShader(program, fragShader!);
  gl.linkProgram(program);

  return program;
}

/**
 *
 * @param gl gl
 * @param vertexSource vertex shader
 * @param fragmentSource fragment shader
 * @returns
 */
function createAndUseProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram {
  const program = createProgram(gl, vertexSource, fragmentSource);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const infoLog = gl.getProgramInfoLog(program);

    console.error(`Program link error :${infoLog}`);
    throw new Error(`Program  link error ${infoLog}`);
  }

  gl.useProgram(program);

  return program;
}

export { createAndUseProgram, createProgram };
