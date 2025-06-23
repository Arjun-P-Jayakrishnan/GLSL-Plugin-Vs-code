import { Vector3 } from "../../utils/vector.js";
function lookAt(eye, center, up) {
    const z = eye.clone().subtract(center);
    const x = Vector3().CrossProduct(up, z).normalize();
    const y = Vector3().CrossProduct(z, x);
    const vec3 = Vector3();
    return new Float32Array([
        ...[x.x, y.x, z.x, 0],
        ...[x.y, y.y, z.y, 0],
        ...[x.z, y.z, z.z, 0],
        ...[
            -vec3.DotProduct(x, eye),
            -vec3.DotProduct(y, eye),
            -vec3.DotProduct(z, eye),
            1,
        ],
    ]);
}
function makePerspective(fovY, aspect, near, far) {
    const f = 1 / Math.tan(fovY / 2);
    const nf = 1 / (near - far);
    return new Float32Array([
        ...[f / aspect, 0, 0, 0],
        ...[0, f, 0, 0],
        ...[0, 0, (far + near) * nf, -1],
        ...[0, 0, 2 * far * near * nf, 0],
    ]);
}
export { lookAt, makePerspective };
