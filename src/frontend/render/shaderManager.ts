import { fragmentShaderSample } from "../sample/frag.js";
import { vertexShaderSample } from "../sample/vert2D.js";
import { Nullable } from "../types/global";

export type RenderCallback = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  time: number,
  delta: number
) => void;

export interface ShaderManager {
  init: (gl: WebGLRenderingContext) => Promise<void>;

  loadShaderProgram: (
    name: string,
    vertexShaderCode: string,
    fragmentShaderCode: string
  ) => Promise<void>;

  getProgram: (name: string) => WebGLProgram;

  useProgram: (name: string) => void;

  getUniformLocation: (
    programName: string,
    uniformName: string
  ) => WebGLUniformLocation;

  setRenderCallback: (fn: RenderCallback) => void;

  renderFrame: (programName: string, time: number, delta: number) => void;
}

export const createShaderManager = (): ShaderManager => {
  const programs: Map<string, WebGLProgram> = new Map();
  let _gl: Nullable<WebGLRenderingContext> = null;
  let _fn: Nullable<RenderCallback> = null;

  const init = async (gl: WebGLRenderingContext) => {
    _gl = gl;

    await loadShaderProgram(
      "default",
      vertexShaderSample,
      fragmentShaderSample
    );
  };

  const loadShaderProgram = async (
    name: string,
    vertexShaderCode: string,
    fragmnetShaderCode: string
  ) => {
    if (!_gl) throw new Error(`gl not initialized `);

    const vertexShader = compileShader(vertexShaderCode, _gl.VERTEX_SHADER);
    const fragmentShader = compileShader(
      fragmnetShaderCode,
      _gl.FRAGMENT_SHADER
    );

    const program = linkProgram(vertexShader, fragmentShader);

    programs.set(name, program);
  };

  const getProgram = (name: string): WebGLProgram => {
    const program = programs.get(name);

    if (!program)
      throw new Error(`couldnt fetch the program with name ${name}`);

    return program;
  };

  const useProgram = (name: string) => {
    const program = getProgram(name);
    _gl?.useProgram(program);
  };

  const getUniformLocation = (
    programName: string,
    uniformName: string
  ): WebGLUniformLocation => {
    const program = programs.get(programName);
    if (!program) throw new Error(`program not found`);
    const location = _gl?.getUniformLocation(program, uniformName);

    if (!location) throw new Error(`couldnt find the location ${location}`);

    return location;
  };

  const compileShader = (source: string, type: GLenum) => {
    if (!_gl) throw new Error(`gl not initialized`);

    const shader: Nullable<WebGLShader> = _gl.createShader(type);

    if (!shader) throw new Error(`Failed to create shader`);

    _gl.shaderSource(shader, source);
    _gl.compileShader(shader);

    if (_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
      const info = _gl.getShaderInfoLog(shader);
      _gl.deleteShader(shader);

      throw new Error(`Failed to compile shader : ${info}`);
    }

    return shader;
  };

  const linkProgram = (
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ) => {
    if (!_gl) throw new Error(`gl must be initialized before linking`);

    const program = _gl.createProgram();
    if (!program) throw new Error(`program couldnt be created`);

    _gl.attachShader(program, vertexShader);
    _gl.attachShader(program, fragmentShader);
    _gl.linkProgram(program);

    if (!_gl.getProgramParameter(program, _gl.LINK_STATUS)) {
      const info = _gl.getShaderInfoLog(program);
      _gl.deleteProgram(program);

      throw new Error(`error occured while info ${info}`);
    }

    _gl.detachShader(program, vertexShader);
    _gl.detachShader(program, fragmentShader);
    _gl.deleteShader(vertexShader);
    _gl.deleteShader(fragmentShader);

    return program;
  };

  const setRenderCallback = (fn: RenderCallback) => {
    _fn = fn;
  };

  const renderFrame = (programName: string, time: number, delta: number) => {
    const program = programs.get(programName);
    if (!_gl) throw new Error(`gl doesnt exist`);
    if (!program)
      throw new Error(`the program with name ${programName} is not found`);
    if (!_fn) throw new Error(`Render callback not set`);

    _fn(_gl, program, time, delta);
  };

  return {
    init,
    getProgram,
    useProgram,
    getUniformLocation,
    loadShaderProgram,
    setRenderCallback,
    renderFrame,
  };
};
