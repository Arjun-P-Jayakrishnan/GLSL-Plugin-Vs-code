export interface FrameContextBuilder {
  init: (canvas: HTMLCanvasElement) => void;
  build: (currentTimestamp: number, canvas: HTMLCanvasElement) => FrameContext;
}

export interface FrameContext {
  timestamp: number;
  delta: number;
  resolution: [number, number];
  inputState: {
    mouse: [number, number];
    mouseDown: boolean;
    keys: Set<string>;
  };
}

export const frameContextBuilder = (): FrameContextBuilder => {
  let lastTimestamp = 0;
  const keys = new Set<string>();
  let mouse: [number, number] = [0, 0];
  let mouseDown = false;

  const init = (canvas: HTMLCanvasElement) => {
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = [e.clientX - rect.x, e.clientY - rect.y];
    });

    canvas.addEventListener("mouseup", (e) => (mouseDown = false));
    canvas.addEventListener("mousedown", (e) => (mouseDown = true));

    window.addEventListener("keyup", (e) => keys.delete(e.key));
    window.addEventListener("keydown", (e) => keys.add(e.key));
  };

  const build = (
    currentTimestamp: number,
    canvas: HTMLCanvasElement
  ): FrameContext => {
    const delta = currentTimestamp - lastTimestamp;
    lastTimestamp = currentTimestamp;

    return {
      timestamp: currentTimestamp,
      delta: delta,
      resolution: [canvas.width, canvas.height],
      inputState: {
        mouse: mouse,
        keys: new Set(keys),
        mouseDown: mouseDown,
      },
    };
  };

  return {
    init,
    build,
  };
};
