function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    if (!shader)
        return;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    console.log(shader, source);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = document.getElementById("error-text");
        error.innerText = "Program link error:" + gl.getShaderInfoLog(shader);
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
function createProgram(gl, vertexSource, fragmentSource) {
    console.log("vertex");
    const vertShader = compileShader(gl, vertexSource, gl.VERTEX_SHADER);
    console.log("fragment");
    const fragShader = compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    return program;
}
export { createProgram };
