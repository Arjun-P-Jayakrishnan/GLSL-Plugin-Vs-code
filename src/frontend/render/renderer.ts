import { router } from "../router/messageRouter.js";
import { render2D } from "./2d-playground.js";

type Nullable<T> = T | null;

/**
 *
 */
const RunShaderPreview = (
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  const canvas = document.getElementById("glcanvas") as HTMLCanvasElement;
  const gl: Nullable<WebGLRenderingContext> = canvas!.getContext("webgl");

  if (!gl) {
    throw new Error(`Web GL not supported`);
  }

  const btn = document.getElementById("selectBtn") as HTMLButtonElement;
  if (btn) {
    btn.addEventListener("click", (e) => {
      console.log("button clicked to select file");
      router.send({
        type: "select-file",
        payload: {},
      });
    });
  }

  render2D(gl, fragmentShaderSource);
  //render3D(gl, vertexShaderSample, fragmentShaderSample);
};

export { RunShaderPreview };
