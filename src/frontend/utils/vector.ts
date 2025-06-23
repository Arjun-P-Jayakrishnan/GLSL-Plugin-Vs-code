interface VectorXYZ {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  clone: () => VectorXYZ;
  copy: (a: VectorXYZ) => VectorXYZ;
  add: (a: VectorXYZ) => VectorXYZ;
  subtract: (a: VectorXYZ) => VectorXYZ;
  scale: (scale: number) => VectorXYZ;
  length: () => number;
  normalize: () => VectorXYZ;
  DotProduct: (a: VectorXYZ, b: VectorXYZ) => number;
  CrossProduct: (a: VectorXYZ, b: VectorXYZ) => VectorXYZ;
}

const Vector3 = ({
  x = 0,
  y = 0,
  z = 0,
}: {
  x?: number;
  y?: number;
  z?: number;
} = {}): VectorXYZ => {
  const vec3 = { x, y, z };

  const instance: VectorXYZ = {
    get x() {
      return vec3.x;
    },
    get y() {
      return vec3.y;
    },
    get z() {
      return vec3.z;
    },

    scale: (scale: number) => {
      vec3.x *= scale;
      vec3.y *= scale;
      vec3.z *= scale;
      return instance;
    },

    copy: (a: VectorXYZ) => {
      vec3.x = a.x;
      vec3.y = a.y;
      vec3.z = a.z;
      return instance;
    },

    add: (a: VectorXYZ) => {
      vec3.x += a.x;
      vec3.y += a.y;
      vec3.z += a.z;

      return instance;
    },

    subtract: (a: VectorXYZ) => {
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
      const sqSum =
        Math.pow(vec3.x, 2) + Math.pow(vec3.y, 2) + Math.pow(vec3.z, 2);

      const mag = Math.sqrt(sqSum);
      return mag;
    },

    DotProduct: (a: VectorXYZ, b: VectorXYZ) => {
      return a.x * b.x + a.y * b.y + a.z * b.z;
    },

    CrossProduct: (a: VectorXYZ, b: VectorXYZ) => {
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
export type { VectorXYZ };
