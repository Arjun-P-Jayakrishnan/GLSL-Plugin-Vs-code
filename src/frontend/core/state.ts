import { Nullable } from "../types/global.js";

export interface AppState {
  gl: Nullable<WebGLRenderingContext>;

  setGl: (gl: WebGLRenderingContext) => void;

  programName: string;

  setProgramName: (programName: string) => void;
}

export const createAppState = (): AppState => {
  let _gl: Nullable<WebGLRenderingContext> = null;
  let _programName: Nullable<string> = null;

  const setGl = (gl: WebGLRenderingContext) => {
    _gl = gl;
  };

  const setProgramName = (programName: string) => {
    _programName = programName;
  };

  return {
    gl: _gl,
    setGl,
    programName: _programName ?? "default",
    setProgramName: setProgramName,
  };
};
