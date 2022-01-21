var contextArray = [];
export var gl;
export class Context {
  static AddContext(ctx) {
    if (!ctx)
      throw "Failed to add WebGLRenderingContext !";
    return contextArray.push(ctx) - 1;
  }
  static SetContext(ctx, index = 0) {
    contextArray[index] = ctx;
  }
  static UseContext(index) {
    gl = contextArray[index];
  }
}
