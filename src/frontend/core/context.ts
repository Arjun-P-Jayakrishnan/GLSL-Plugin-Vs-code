import { createShaderManager, ShaderManager } from "../render/shaderManager";
import { AppConfig, loadConfig } from "./config";
import { frameContextBuilder, FrameContextBuilder } from "./frame";
import { logger, Logger } from "./logger";
import { AppState, createAppState } from "./state";

export interface AppContext {
  config: AppConfig;
  state: AppState;
  logger: Logger;
  shaderManager: ShaderManager;
  frameContextBuider: FrameContextBuilder;
}

export const createAppContext = async (): Promise<AppContext> => {
  const _config = loadConfig();
  const _logger = logger("development");
  const _state = createAppState();
  const _shaderManager = createShaderManager();
  const _frameContextBuilder = frameContextBuilder();

  return {
    config: _config,
    logger: _logger,
    state: _state,
    shaderManager: _shaderManager,
    frameContextBuider: _frameContextBuilder,
  };
};
