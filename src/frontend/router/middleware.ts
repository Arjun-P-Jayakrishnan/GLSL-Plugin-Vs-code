import { MessageContext } from "../types/context";

export type Middleware = (
  ctx: MessageContext,
  next: () => Promise<void>
) => Promise<void>;

export function composeMiddleware(
  middleware: Middleware[],
  handler: (ctx: MessageContext) => Promise<void>
) {
  return async function compose(ctx: MessageContext) {
    let index = -1;

    async function dispatch(i: number): Promise<void> {
      if (i <= index) throw new Error("next() called multiple times.");

      index = i;
      const fn = i === middleware.length ? handler : middleware[i];

      if (fn) await fn(ctx, () => dispatch(i + 1));
    }
    await dispatch(0);
  };
}
