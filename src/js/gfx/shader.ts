import type Context from "./context";

export class Shader {
    private program: WebGLProgram;
    private gl: WebGLRenderingContext;

    /**
     * Create new Shader.
     * @param v The vertex shader source
     * @param f The fragment shader source
     */
    constructor(context: Context, v: string, f: string) {
        this.gl = context.gl;

        // Compile both shaders...
        const vs = this.compileShader(v, this.gl.VERTEX_SHADER);
        const fs = this.compileShader(f, this.gl.FRAGMENT_SHADER);

        // Link them into program...
        this.program = this.createProgram(vs, fs);
    }

    /**
     * Use this shader (is just a `this.gl.useProgram(...)`).
     */
    public use() {
        this.gl.useProgram(this.program);
    }

    public dispose() {
        this.gl.useProgram(null);
    }

    public get prog() {
        return this.program;
    }

    public setAttrLocation(name: string) {
        return this.gl.getAttribLocation(this.program, name);
    }

    public setUniformF(name: string, x: number, y?: number, z?: number, w?: number) {
        const location = this.gl.getUniformLocation(this.program, name);

        if (y != undefined && z != undefined && w != undefined)
            this.gl.uniform4f(location, x, y, z, w);
        else if (y != undefined && z != undefined)
            this.gl.uniform3f(location, x, y, z);
        else if (y != undefined)
            this.gl.uniform2f(location, x, y);
        else
            this.gl.uniform1f(location, x);
    }

    public setUniformI(name: string, x: number, y?: number, z?: number, w?: number) {
        const location = this.gl.getUniformLocation(this.program, name);

        if (y != undefined && z != undefined && w != undefined)
            this.gl.uniform4i(location, x, y, z, w);
        else if (y != undefined && z != undefined)
            this.gl.uniform3i(location, x, y, z);
        else if (y != undefined)
            this.gl.uniform2i(location, x, y);
        else
            this.gl.uniform1i(location, x);
    }

    public setUniform1FArray(name: string, x: number[]) {
        const location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform1fv(location, x);
    }

    public setUniform2FArray(name: string, x: number[]) {
        const location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform2fv(location, x);
    }

    public setUniform3FArray(name: string, x: number[]) {
        const location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform3fv(location, x);
    }

    public setUniform4FArray(name: string, x: number[]) {
        const location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform4fv(location, x);
    }

    public setUniform1IArray(name: string, x: number[]) {
        const location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform1iv(location, x);
    }

    public setUniform2IArray(name: string, x: number[]) {
        const location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform2iv(location, x);
    }

    public setUniform3IArray(name: string, x: number[]) {
        const location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform3iv(location, x);
    }

    public setUniform4IArray(name: string, x: number[]) {
        const location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform4iv(location, x);
    }

    /**
     * Creates and compiles a shader.
     *
     * @param shaderSource The GLSL source code for the shader.
     * @param shaderType The type of shader, VERTEX_SHADER or
     *                      FRAGMENT_SHADER.
     * @return The shader.
     */
    private compileShader(shaderSource: string, shaderType: number) {
        // Create the shader object
        const shader = this.gl.createShader(shaderType);

        if (!shader)
            throw "Failed to create shader!";

        // Set the shader source code.
        this.gl.shaderSource(shader, shaderSource);

        // Compile the shader
        this.gl.compileShader(shader);

        // Check if it compiled
        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw "could not compile shader:" + this.gl.getShaderInfoLog(shader);
        }

        return shader;
    }

    /**
     * Creates a program from 2 shaders.
     *
     * @param gl The WebGL context.
     * @param vertexShader A vertex shader.
     * @param fragmentShader A fragment shader.
     * @return A program.
     */
    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        // create a program.
        const program = this.gl.createProgram();

        if (!program)
            throw "Failed to create program!";
        
        // attach the shaders.
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        
        // link the program.
        this.gl.linkProgram(program);
        
        // Check if it linked.
        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (!success) {
            // something went wrong with the link
            throw ("program failed to link:" + this.gl.getProgramInfoLog (program));
        }
        
        return program;
    };
}