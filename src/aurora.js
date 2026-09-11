// ==========================================================================
// Aurora WebGL Animated Background Component (React Bits)
// Source: https://reactbits.dev/backgrounds/aurora
// High-performance WebGL2 shader with simplex noise & harmonic color ramps
// ==========================================================================

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);
    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);
    vec3 chroma = pow(clamp(rampColor, 0.0, 1.0), vec3(1.2));
    float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
    chroma /= max(chromaPeak, 0.0001);
    // Soft blend with porcelain background
    fragColor = vec4(mix(vec3(0.984, 0.984, 0.996), chroma, min(coverage * 0.55, 0.45)), 1.0);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`;

export function initAurora(containerId = 'aurora-container', customOptions = {}) {
  const ctn = document.getElementById(containerId);
  if (!ctn) return null;

  const defaults = {
    colorStops: ['#5227FF', '#7cff67', '#5227FF'],
    amplitude: 1.0,
    blend: 0.5,
    speed: 0.65
  };

  const opts = { ...defaults, ...customOptions };

  try {
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    if (!gl) return null;

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.inset = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.pointerEvents = 'none';

    let program;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth || window.innerWidth;
      const height = ctn.offsetHeight || window.innerHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const parseColors = (stops) => {
      return stops.map(hex => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
    };

    const isLightMode = () => document.documentElement.getAttribute('data-theme') !== 'dark';

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: opts.amplitude },
        uColorStops: { value: parseColors(opts.colorStops) },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uBlend: { value: opts.blend },
        uLightMode: { value: isLightMode() ? 1.0 : 0.0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.innerHTML = '';
    ctn.appendChild(gl.canvas);
    resize();

    // Observe theme mode changes to update uLightMode
    const themeObserver = new MutationObserver(() => {
      if (program) {
        program.uniforms.uLightMode.value = isLightMode() ? 1.0 : 0.0;
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    let animateId = 0;
    let lastTime = 0;
    let totalTime = 0;

    const update = (now) => {
      animateId = requestAnimationFrame(update);
      if (!lastTime) lastTime = now;
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      // Only advance if tab is visible
      if (!document.hidden) {
        totalTime += delta * opts.speed;
        program.uniforms.uTime.value = totalTime;
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    return {
      destroy() {
        cancelAnimationFrame(animateId);
        window.removeEventListener('resize', resize);
        themeObserver.disconnect();
        if (gl.canvas && gl.canvas.parentNode) {
          gl.canvas.parentNode.removeChild(gl.canvas);
        }
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  } catch (err) {
    console.warn('Aurora WebGL background initialization failed:', err);
    return null;
  }
}
