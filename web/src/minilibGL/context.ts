/** The global WebGL context. */
var contextArray: WebGLRenderingContext[] = [];
export var gl: WebGLRenderingContext;

/**
 * WebGL context management class.
 * 
 * All methods is static so you don't
 * need to create new instance of this
 * class.
 */
export class Context {
    /**
     * Add a new webgl context.
     * @param ctx The context to be added
     * @returns The index of the context.
     */
    static AddContext(ctx: WebGLRenderingContext | null | undefined) : number {
        if (!ctx)
            throw "Failed to add WebGLRenderingContext !";
        
        return contextArray.push(ctx) - 1;
    }

    /**
     * Replace a webgl context.
     * @param ctx The new context
     * @param index The context index to be replaced
     */
    static SetContext(ctx: WebGLRenderingContext, index: number = 0) {
        contextArray[index] = ctx;
    }

    /**
     * Use a webgl context.
     * @param index The index of the context to use
     */
    static UseContext(index: number) {
        gl = contextArray[index];
    }
}