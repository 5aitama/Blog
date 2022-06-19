import { Shader } from "../gfx";
import type Context from "../gfx/context";
import vShaderFile from "@/js/animated-background/shaders/main.vert?raw";
import fShaderFile from "@/js/animated-background/shaders/main.frag?raw";

/**
 * A beautifull animated background!
 */
export default class AnimatedBackground {
    /** The context on wich we will render */
    private context: Context;
    /** The shader used to render the animated background */
    private shader?: Shader;
    /** The a buffer will store the vertices */
    private pBuff?: WebGLBuffer;
    /** The mouse position from the DOM */
    private mouse: { x: number, y: number } = {x: 0, y: 0};
    private lastScrollY = 0;

    /**
     * Create a new `AnimatedBackground` instance.
     * @param context The context on wich the animated background will render
     */
    constructor(context: Context) {
        this.context = context;
        window.addEventListener("resize", () => this.onCanvasResize(this));

        document.addEventListener("mousemove", (ev) => {
            this.mouse.x = ev.pageX * devicePixelRatio;
            this.mouse.y = this.context.canvas.height - ev.pageY * devicePixelRatio;
        });
        
        document.addEventListener("scroll", (ev) => {
            const delta = window.scrollY - this.lastScrollY;
            this.lastScrollY = window.scrollY;
            this.mouse.y -= delta * devicePixelRatio;
        });
    }

    public start() {
        const vert = vShaderFile;
        const frag = fShaderFile;
        
        this.shader = new Shader(this.context, vert, frag);
        this.shader.use();

        this.onCanvasResize(this);
    
        const bg = 33.0 / 255.0;
        const fg = 29.0 / 255.0;
    
        this.shader.setUniformF("bg_color", bg, bg, bg);
        this.shader.setUniformF("fg_color", fg, fg, fg);
        
        const pBuffData = [
            -1, -1,
            -1,  1,
             1,  1,
    
            -1, -1,
             1,  1,
             1, -1,
        ];
        
        this.pBuff = this.context.gl.createBuffer()!;
    
        this.context.gl.bindBuffer(this.context.gl.ARRAY_BUFFER, this.pBuff);
        this.context.gl.bufferData(this.context.gl.ARRAY_BUFFER, new Float32Array(pBuffData), this.context.gl.STATIC_DRAW);
        
        this.render(this);
    }

    private render(caller: AnimatedBackground, time: number = 0) {
        requestAnimationFrame(t => { caller.render(caller, t) });
        
        if (!this.shader || !this.pBuff) return;
        
        this.context.gl.viewport(0, 0, this.context.gl.canvas.width, this.context.gl.canvas.height);
        this.context.gl.clear(this.context.gl.COLOR_BUFFER_BIT);
        this.context.gl.clearColor(0, 0, 0, 1);
        
        this.shader.setUniformF("time", time / 1000);
        this.shader.setUniformF("mouse_pos", this.mouse.x, this.mouse.y);
        this.shader.setUniformF("pixelRatio", devicePixelRatio);
        
        this.shader.use();
    
        this.context.gl.bindBuffer(this.context.gl.ARRAY_BUFFER, this.pBuff);

        const attrib = this.context.gl.getAttribLocation(this.shader.prog, "position");

        this.context.gl.enableVertexAttribArray(attrib);
        this.context.gl.vertexAttribPointer(attrib, 2, this.context.gl.FLOAT, false, 0, 0);
    
        this.context.gl.drawArrays(this.context.gl.TRIANGLES, 0, 6);
    }

    private onCanvasResize(caller: AnimatedBackground) {
        let canvas = caller.context.canvas;
        
        canvas.width    = caller.context.canvas.clientWidth  * devicePixelRatio;
        canvas.height   = caller.context.canvas.clientHeight * devicePixelRatio;
    
        if (!caller.shader) return

        let w = caller.context.gl.canvas.width;
        let h = caller.context.gl.canvas.height;
        
        caller.shader.setUniformF("screen_size", w, h);
    }

};