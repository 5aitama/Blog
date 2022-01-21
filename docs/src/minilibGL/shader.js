import {gl} from "./context.js";
export class Shader {
  constructor(v, f) {
    const vs = this.CompileShader(v, gl.VERTEX_SHADER);
    const fs = this.CompileShader(f, gl.FRAGMENT_SHADER);
    this.program = this.CreateProgram(vs, fs);
  }
  Use() {
    gl.useProgram(this.program);
  }
  get Program() {
    return this.program;
  }
  GetAttrLocation(name) {
    return gl.getAttribLocation(this.program, name);
  }
  SetUniformF(name, x, y, z, w) {
    const location = gl.getUniformLocation(this.program, name);
    if (y != void 0 && z != void 0 && w != void 0)
      gl.uniform4f(location, x, y, z, w);
    else if (y != void 0 && z != void 0)
      gl.uniform3f(location, x, y, z);
    else if (y != void 0)
      gl.uniform2f(location, x, y);
    else
      gl.uniform1f(location, x);
  }
  SetUniformI(name, x, y, z, w) {
    const location = gl.getUniformLocation(this.program, name);
    if (y != void 0 && z != void 0 && w != void 0)
      gl.uniform4i(location, x, y, z, w);
    else if (y != void 0 && z != void 0)
      gl.uniform3i(location, x, y, z);
    else if (y != void 0)
      gl.uniform2i(location, x, y);
    else
      gl.uniform1i(location, x);
  }
  SetUniform1FArray(name, x) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform1fv(location, x);
  }
  SetUniform2FArray(name, x) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform2fv(location, x);
  }
  SetUniform3FArray(name, x) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform3fv(location, x);
  }
  SetUniform4FArray(name, x) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform4fv(location, x);
  }
  SetUniform1IArray(name, x) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform1iv(location, x);
  }
  SetUniform2IArray(name, x) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform2iv(location, x);
  }
  SetUniform3IArray(name, x) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform3iv(location, x);
  }
  SetUniform4IArray(name, x) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform4iv(location, x);
  }
  CompileShader(shaderSource, shaderType) {
    const shader = gl.createShader(shaderType);
    if (!shader)
      throw "Failed to create shader!";
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }
    return shader;
  }
  CreateProgram(vertexShader, fragmentShader) {
    const program = gl.createProgram();
    if (!program)
      throw "Failed to create program!";
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      throw "program failed to link:" + gl.getProgramInfoLog(program);
    }
    return program;
  }
}
