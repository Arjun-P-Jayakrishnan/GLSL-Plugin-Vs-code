const Vector3 = ({ x = 0, y = 0, z = 0, } = {}) => {
    const vec3 = { x, y, z };
    const instance = {
        get x() {
            return vec3.x;
        },
        get y() {
            return vec3.y;
        },
        get z() {
            return vec3.z;
        },
        scale: (scale) => {
            vec3.x *= scale;
            vec3.y *= scale;
            vec3.z *= scale;
            return instance;
        },
        copy: (a) => {
            vec3.x = a.x;
            vec3.y = a.y;
            vec3.z = a.z;
            return instance;
        },
        add: (a) => {
            vec3.x += a.x;
            vec3.y += a.y;
            vec3.z += a.z;
            return instance;
        },
        subtract: (a) => {
            vec3.x -= a.x;
            vec3.y -= a.y;
            vec3.z -= a.z;
            return instance;
        },
        clone: () => {
            return Vector3({
                x: vec3.x,
                y: vec3.y,
                z: vec3.z,
            });
        },
        normalize: () => {
            instance.scale(1 / instance.length());
            return instance;
        },
        length: () => {
            const sqSum = Math.pow(vec3.x, 2) + Math.pow(vec3.y, 2) + Math.pow(vec3.z, 2);
            const mag = Math.sqrt(sqSum);
            return mag;
        },
        DotProduct: (a, b) => {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        },
        CrossProduct: (a, b) => {
            return Vector3({
                x: a.y * b.z - a.z * b.y,
                y: a.z * b.x - b.z * a.x,
                z: a.x * b.y - a.y * b.x,
            });
        },
    };
    return instance;
};
export { Vector3 };
