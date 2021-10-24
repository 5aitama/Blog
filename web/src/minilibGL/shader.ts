import { gl } from "./context";

export class Shader {
    private program: WebGLProgram;

    /**
     * Create new Shader.
     * @param v The vertex shader source
     * @param f The fragment shader source
     */
    constructor(v: string, f: string) {
        // Compile both shaders...
        const vs = this.CompileShader(v, gl.VERTEX_SHADER);
        const fs = this.CompileShader(f, gl.FRAGMENT_SHADER);

        // Link them into program...
        this.program = this.CreateProgram(vs, fs);
    }

    /**
     * Use this shader (is just a `gl.useProgram(...)`).
     */
    public Use() {
        gl.useProgram(this.program);
    }

    public get Program() {
        return this.program;
    }

    public GetAttrLocation(name: string) {
        return gl.getAttribLocation(this.program, name);
    }

    public SetUniformF(name: string, x: number, y?: number, z?: number, w?: number) {
        const location = gl.getUniformLocation(this.program, name);

        if (y != undefined && z != undefined && w != undefined)
            gl.uniform4f(location, x, y, z, w);
        else if (y != undefined && z != undefined)
            gl.uniform3f(location, x, y, z);
        else if (y != undefined)
            gl.uniform2f(location, x, y);
        else
            gl.uniform1f(location, x);
    }

    public SetUniformI(name: string, x: number, y?: number, z?: number, w?: number) {
        const location = gl.getUniformLocation(this.program, name);

        if (y != undefined && z != undefined && w != undefined)
            gl.uniform4i(location, x, y, z, w);
        else if (y != undefined && z != undefined)
            gl.uniform3i(location, x, y, z);
        else if (y != undefined)
            gl.uniform2i(location, x, y);
        else
            gl.uniform1i(location, x);
    }

    public SetUniform1FArray(name: string, x: number[]) {
        const location = gl.getUniformLocation(this.program, name);
        gl.uniform1fv(location, x);
    }

    public SetUniform2FArray(name: string, x: number[]) {
        const location = gl.getUniformLocation(this.program, name);
        gl.uniform2fv(location, x);
    }

    public SetUniform3FArray(name: string, x: number[]) {
        const location = gl.getUniformLocation(this.program, name);
        gl.uniform3fv(location, x);
    }

    public SetUniform4FArray(name: string, x: number[]) {
        const location = gl.getUniformLocation(this.program, name);
        gl.uniform4fv(location, x);
    }

    public SetUniform1IArray(name: string, x: number[]) {
        const location = gl.getUniformLocation(this.program, name);
        gl.uniform1iv(location, x);
    }

    public SetUniform2IArray(name: string, x: number[]) {
        const location = gl.getUniformLocation(this.program, name);
        gl.uniform2iv(location, x);
    }

    public SetUniform3IArray(name: string, x: number[]) {
        const location = gl.getUniformLocation(this.program, name);
        gl.uniform3iv(location, x);
    }

    public SetUniform4IArray(name: string, x: number[]) {
        const location = gl.getUniformLocation(this.program, name);
        gl.uniform4iv(location, x);
    }

    /**
     * Creates and compiles a shader.
     *
     * @param gl The WebGL Context.
     * @param shaderSource The GLSL source code for the shader.
     * @param shaderType The type of shader, VERTEX_SHADER or
     *     FRAGMENT_SHADER.
     * @return The shader.
     */
    private CompileShader(shaderSource: string, shaderType: number) {
        // Create the shader object
        const shader = gl.createShader(shaderType);

        if (!shader)
            throw "Failed to create shader!";

        // Set the shader source code.
        gl.shaderSource(shader, shaderSource);

        // Compile the shader
        gl.compileShader(shader);

        // Check if it compiled
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw "could not compile shader:" + gl.getShaderInfoLog(shader);
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
    private CreateProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        // create a program.
        const program = gl.createProgram();

        if (!program)
            throw "Failed to create program!";
        
        // attach the shaders.
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        
        // link the program.
        gl.linkProgram(program);
        
        // Check if it linked.
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            // something went wrong with the link
            throw ("program failed to link:" + gl.getProgramInfoLog (program));
        }
        
        return program;
    };
}