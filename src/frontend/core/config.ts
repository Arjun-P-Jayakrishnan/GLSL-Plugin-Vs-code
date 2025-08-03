export interface AppConfig {
  env: "development" | "production";
  enableDebugUI: boolean;
}

export const loadConfig = (): AppConfig => {
  const isDev = true;
  return {
    env: isDev ? "development" : "production",
    enableDebugUI: isDev,
  };
};
