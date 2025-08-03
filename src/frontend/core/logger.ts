export interface Logger {
  info: (...args: any[]) => void;
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  trace: (...args: any[]) => void;
}

export const logger = (env: "development" | "production"): Logger => {
  const info = (...args: any[]) => {
    if (env === "development") console.info(...args);
  };
  const log = (...args: any[]) => {
    if (env === "development") console.log(...args);
  };

  const warn = (...args: any[]) => {
    if (env === "development") console.warn(...args);
  };

  const error = (...args: any[]) => {
    if (env === "development") console.error(...args);
  };

  const trace = (...args: any[]) => {
    if (env === "development") console.trace(...args);
  };

  return {
    info,
    log,
    warn,
    error,
    trace,
  };
};
