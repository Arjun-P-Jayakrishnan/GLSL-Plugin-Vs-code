const cubeVertices = new Float32Array([
    -1,
    -1,
    -1, // 0
    1,
    -1,
    -1, // 1
    1,
    1,
    -1, // 2
    -1,
    1,
    -1, // 3
    -1,
    -1,
    1, // 4
    1,
    -1,
    1, // 5
    1,
    1,
    1, // 6
    -1,
    1,
    1, // 7
]);
const cubeIndices = new Uint16Array([
    0,
    1,
    2,
    0,
    2,
    3, // back
    4,
    5,
    6,
    4,
    6,
    7, // front
    0,
    4,
    7,
    0,
    7,
    3, // left
    1,
    5,
    6,
    1,
    6,
    2, // right
    3,
    2,
    6,
    3,
    6,
    7, // top
    0,
    1,
    5,
    0,
    5,
    4, // bottom
]);
function createAndBindBuffer(gl, vertexData, indices, program) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    const positionAttribute = gl.getAttribLocation(program, "position");
    console.log("position", positionAttribute);
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 0, 0);
}
export { createAndBindBuffer, cubeIndices, cubeVertices };
