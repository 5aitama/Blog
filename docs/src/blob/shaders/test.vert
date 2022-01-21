attribute vec4 position;
varying vec2 uv_coord;

void main() {
    uv_coord = (position.xy + 1.0) / 2.0;
    gl_Position = position;
}