const cubeVertices = new Float32Array([
    // Front face
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
    // Back face
    -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1,
]);
const cubeIndices = new Uint16Array([
    // Front
    0, 1, 2, 0, 2, 3,
    // Top
    3, 2, 6, 3, 6, 5,
    // Back
    5, 6, 7, 5, 7, 4,
    // Bottom
    4, 7, 1, 4, 1, 0,
    // Right
    1, 7, 6, 1, 6, 2,
    // Left
    4, 0, 3, 4, 3, 5,
]);
function createAndBindBuffer(gl, vertexData, indices, program) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    const positionAttribute = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
}
export { createAndBindBuffer, cubeIndices, cubeVertices };
