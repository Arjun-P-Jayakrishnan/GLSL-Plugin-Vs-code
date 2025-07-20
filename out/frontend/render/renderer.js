import { router } from "../router/messageRouter.js";
import { render2D } from "./2d-playground.js";
/**
 *
 */
const RunShaderPreview = (vertexShaderSource, fragmentShaderSource) => {
    const canvas = document.getElementById("glcanvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        throw new Error(`Web GL not supported`);
    }
    const btn = document.getElementById("selectBtn");
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
