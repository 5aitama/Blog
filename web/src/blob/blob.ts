import { Context, Shader, gl } from "../minilibGL";

const canvas_id = '#blob';
const parent_id = '.header';

const parent = document.querySelector(parent_id) as HTMLDivElement;
const canvas = document.querySelector(canvas_id) as HTMLCanvasElement | null;

if (!canvas)
    throw "Canvas #blob not found!";

const ctx = canvas.getContext("webgl");
Context.UseContext(Context.AddContext(ctx));

canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;

var geometryData: { buffer: WebGLBuffer};
var shader: Shader;

function Resize() {
    if (!canvas) 
        return;
    
    canvas.width = parent.clientWidth * devicePixelRatio;
    canvas.height = parent.clientHeight * devicePixelRatio;

    if (shader)
        shader.SetUniformF("screen_size", gl.canvas.width, gl.canvas.height);
}

window.addEventListener("resize", () => Resize());

async function setup() {
    const vert = await fetch("src/blob/shaders/test.vert").then(res => res.text());
    const frag = await fetch("src/blob/shaders/test.frag").then(res => res.text());
    
    shader = new Shader(vert, frag);
    shader.Use();

    Resize();

    const bg = 33.0 / 255.0;
    const fg = 29.0 / 255.0;

    shader.SetUniformF("bg_color", bg, bg, bg);
    shader.SetUniformF("fg_color", fg, fg, fg);

    const pAttribLocation = gl.getAttribLocation(shader.Program, "position");
    
    const pBufferData = [
        -1, -1,
        -1,  1,
         1,  1,

        -1, -1,
         1,  1,
         1, -1,
    ];

    const pBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pBufferData), gl.STATIC_DRAW);

    geometryData = {
        buffer: pBuffer!,
    }
}

var lastScrollY = 0;

var mouse: { x: number, y: number } = {x: 0, y: 0};

document.addEventListener("mousemove", (ev) => {
    mouse.x = ev.pageX * devicePixelRatio;
    mouse.y = canvas.height - ev.pageY * devicePixelRatio;
});

document.addEventListener("scroll", (ev) => {
    const delta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;

    mouse.y -= delta * devicePixelRatio;
});

async function render(time: number = 0) {
    requestAnimationFrame(render);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(0, 0, 0, 1);
    
    shader.SetUniformF("time", time / 1000);
    shader.SetUniformF("mouse_pos", mouse.x, mouse.y);
    shader.SetUniformF("pixelRatio", devicePixelRatio);
    
    shader.Use();

    gl.bindBuffer(gl.ARRAY_BUFFER, geometryData.buffer);
    const attrib = gl.getAttribLocation(shader.Program, "position");
    gl.enableVertexAttribArray(attrib);
    gl.vertexAttribPointer(attrib, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

setup().then(() => render());