export interface Lifecycle {
  registerStart: (fn: LifecycleHook) => void;
  registerStop: (fn: LifecycleHook) => void;
  registerError: (fn: LifecycleHook) => void;

  runStartHooks: () => Promise<void>;
  runStopHooks: () => Promise<void>;
  runErrorHooks: (err: Error) => void;
}

export type LifecycleHook = () => void | Promise<void>;

export const createAppLifecycle = (): Lifecycle => {
  const onStart: LifecycleHook[] = [];
  const onStop: LifecycleHook[] = [];
  const onError: ((err: Error) => void)[] = [];

  const registerStart = (fn: LifecycleHook) => {
    onStart.push(fn);
  };

  const registerStop = (fn: LifecycleHook) => {
    onStop.push(fn);
  };

  const registerError = (fn: LifecycleHook) => {
    onError.push(fn);
  };

  const runStartHooks = async () => {
    for (const hook of onStart) await hook();
  };

  const runStopHooks = async () => {
    for (const hook of onStop) await hook();
  };

  const runErrorHooks = (err: Error) => {
    for (const hook of onError) hook(err);
  };

  return {
    registerStart,
    registerStop,
    registerError,
    runErrorHooks,
    runStartHooks,
    runStopHooks,
  };
};
