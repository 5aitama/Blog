export default class Context {
    private ctx: WebGLRenderingContext;
    private element: HTMLCanvasElement;

    constructor(from: HTMLCanvasElement) {
        let ctx = from.getContext('webgl');
        if (!ctx)
            throw "What kind of browser you use ?! Your browser don't support Webgl 1.0 !";

        this.element = from;
        this.ctx = ctx;
    }

    get gl() { return this.ctx }
    get canvas() { return this.element }
}