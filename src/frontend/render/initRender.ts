import { AppContext } from "../core/context";

let animationFrameId: number = 0;

export async function initRender(
  context: AppContext,
  canvas: HTMLCanvasElement
) {
  const gl: WebGLRenderingContext = canvas.getContext("webgl")!;

  if (gl) throw new Error("webgl not supported");

  context.state.setGl(gl);
  context.frameContextBuider.init(canvas);
  await context.shaderManager.init(gl);

  context.logger.info("Webgl initialized");
  startLoop(context);
}

export function startLoop(appContext: AppContext) {
  let lastTime = 0;

  function frameLoop(timestamp: number) {
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    appContext.shaderManager.renderFrame(
      appContext.state.programName,
      timestamp,
      delta
    );
  }

  requestAnimationFrame(frameLoop);
}

export function stopLoop() {
  cancelAnimationFrame(animationFrameId);
}
