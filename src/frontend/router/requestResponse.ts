const pendingResponse = new Map<string, (payload: any) => void>();

/** Create Request Id */
export function createRequestId(): string {
  return Math.random().toString(36).slice(2);
}

/** Adds Item to waiting unresolved requests  */
export function waitForResponse<T>(requestId: string): Promise<T> {
  return new Promise((resolve) => {
    pendingResponse.set(requestId, resolve);
  });
}

/**Resolves recieved message and removes request from queue */
export function resolveResponse(requestId: string, payload: any) {
  const resolve = pendingResponse.get(requestId);

  if (resolve) {
    resolve(payload);
    pendingResponse.delete(requestId);
  }
}
