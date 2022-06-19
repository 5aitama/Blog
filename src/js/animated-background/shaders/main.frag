precision mediump float;

varying vec2 uv_coord;

uniform vec2    screen_size;
uniform vec3    bg_color;
uniform vec3    fg_color;
uniform int     circles_size;
uniform vec2    mouse_pos;
uniform float   time;
uniform float   pixelRatio;

#define PI 3.1415926538

float main_circle_size = 25.0 * pixelRatio;

// Global blend
float globalBlend = 32.0 * pixelRatio;

// Grid
const int grid_res        = 10;
float grid_dot_offset     = 50.0 * pixelRatio;
float grid_dot_size       = 5.0 * pixelRatio;

// Wave
const int   wave_res            = 20;       // The wave resolution (amount of circle).
const float wave_spd            = 1.0;      // The wave speed.
const float wave_amp            = 40.0;     // The wave amplitude.
const float wave_blend          = 120.0;    // The wave circle blend factor.
const float wave_circle_size    = 60.0;     // The wave circle size.
const float wave_particle_blend = 60.0;     // The wave particle blend factor.
const float wave_particle_amp   = 180.0;    // The wave particle amplitude.
const float wave_particle_size  = 10.0;     // The wave particle size.

float hash(float p) { 
    p = fract(p * 0.011); 
    p *= p + 7.5; 
    p *= p + p; 
    return fract(p); 
}

float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), u);
}

/**
 *  Signed distance function of a circle.
 *
 *  r - The radius of the circle.
 *  p - The position of the circle.
 *  u - The pixel screen coordinates.
 */
float sdCircle(float r, vec2 p, vec2 u) {
    return length(u - p) - r;
}

/**
 *  Signed distance function of a box
 *  
 *  p - The box position.
 *  b - The box size (from center).
 *  u - The pixel screen coordinates.
 */
float sdBox(in vec2 p, in vec2 b, in vec2 u)
{
    vec2 d = abs(p - u) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

/**
 *  Signed distance function smooth 
 *  union operation. This function
 *  combine two shapes smoothly.
 *  
 *  d1 - The first shape.
 *  d2 - The second shape.
 *  k  - The smoothness.
 */
float opSmoothUnion( float d1, float d2, float k ) {
    float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k * h * (1.0 - h); 
}

void main() {
    // Calculate the pixel position...
    float s = min(screen_size.x, screen_size.y);
    vec2 uv = ((uv_coord.xy * screen_size.xy) / s) * s;

    float sdf_scene;

    vec2 mpos = mouse_pos;
    float circlem = sdCircle(main_circle_size, mpos, uv);

    vec2 screen_size_half = screen_size / 2.0;

    float shape = sdBox(vec2(screen_size_half.x, 0.0), vec2(screen_size_half.x, 20.0), uv);

    for (int i = 0; i < wave_res; i++) {
        
        float x0 = screen_size.x / float(wave_res - 1) * float(i);
        float y0 = sin((time + float(i)) * wave_spd) * wave_amp;

        float y1 = y0 + noise(x0 + time) * wave_particle_amp;

        float circle0 = sdCircle(wave_circle_size, vec2(x0, y0), uv);
        float circle1 = sdCircle((1.0 - y1 / wave_particle_amp) * wave_particle_size, vec2(x0, y1), uv);
        
        shape = min(shape, opSmoothUnion(shape, circle0, wave_blend));
        shape = min(shape, opSmoothUnion(shape, circle1, wave_particle_blend));
    }

    vec2 grid_dot_half = vec2(float(grid_res) * grid_dot_offset / 2.0);
    vec2 yOffset = vec2(0.0, screen_size.y * 0.1);

    for (int i = 0; i < grid_res; i++) {
        for (int j = 0; j < grid_res; j++) {
            float sx = sin(float(i) / float(grid_res - 1) * PI);
            float sy = sin(float(j) / float(grid_res - 1) * PI);
            float s = (sx + sy) / 2.0;
            float circle = sdCircle(grid_dot_size * s, (vec2(i, j) + vec2(.5, 0)) * grid_dot_offset + screen_size_half - grid_dot_half + yOffset, uv);
            shape = min(shape, circle);
        }
    }

    sdf_scene = opSmoothUnion(shape, circlem, globalBlend);
    sdf_scene = min(1.0, max(0.0, sdf_scene));

    vec3 bg = sdf_scene * bg_color;
    vec3 fg = (1.0 - sdf_scene) * fg_color;

    gl_FragColor = vec4((bg + fg), 1);
}