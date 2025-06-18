"use strict";
document.addEventListener("DOMContentLoaded", () => {
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
    const canvas = document.getElementById("glcanvas");
    if (!canvas) {
        console.error("Canvas not found");
    }
    console.log(canvas);
    const gl = canvas.getContext("webgl");
    if (!gl) {
        throw new Error(`Web Gl not supported`);
    }
    console.log(gl);
    function compileShader(source, type) {
        if (!gl)
            return;
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
    const vertShader = compileShader(vertexSource, gl.VERTEX_SHADER);
    const fragShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);
    console.log(vertShader, fragShader);
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
    }
    else {
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 0, 1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
});
//# sourceMappingURL=main.js.map