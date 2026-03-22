import { useEffect, useRef } from 'react';
import type { WebGLRenderer, ShaderMaterial } from 'three';

interface PointerVector {
  x: number;
  y: number;
  set(nx: number, ny: number): this;
  lerp(target: PointerVector, t: number): this;
}

const createPointerVector = (x = 0, y = 0): PointerVector => ({
  x,
  y,
  set(nx, ny) {
    this.x = nx;
    this.y = ny;
    return this;
  },
  lerp(target, t) {
    this.x += (target.x - this.x) * t;
    this.y += (target.y - this.y) * t;
    return this;
  }
});

const POINTER_SMOOTH = 8;

const frag = `
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform vec3 uColor;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec2 s = q - 0.01;
  vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
  float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t) / 4.0);
  float kBelow = clamp(uWarpStrength, 0.0, 1.0);
  float kMix = pow(kBelow, 0.3);
  float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
  vec2 disp = (r - s) * kBelow;
  vec2 warped = s + disp * gain;
  float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t) / 4.0);
  float m = mix(m0, m1, kMix);
  float w = 1.0 - exp(-6.0 / exp(6.0 * m));
  vec3 col = clamp(uColor * w, 0.0, 1.0);

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

interface ColorBendsProps {
  color?: string;
  rotation?: number;
  speed?: number;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  onReady?: () => void;
}

export default function ColorBends({
  color = '#ffffff',
  rotation = 45,
  speed = 0.2,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1,
  onReady
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const rafRef = useRef<number | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const rotationRef = useRef(rotation);
  const autoRotateRef = useRef(autoRotate);
  const pointerTargetRef = useRef<PointerVector>(createPointerVector());
  const pointerCurrentRef = useRef<PointerVector>(createPointerVector());
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    let canceled = false;
    let cleanup: (() => void) | null = null;

    const initScene = async () => {
      const THREE = await import('three');
      if (canceled) return;

      const container = containerRef.current;
      if (!container) return;

      const toVec3 = (hex: string) => {
        const h = hex.replace('#', '').trim();
        const v =
          h.length === 3
            ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
            : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
        return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);
      };

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uCanvas: { value: new THREE.Vector2(1, 1) },
          uTime: { value: 0 },
          uSpeed: { value: speed },
          uRot: { value: new THREE.Vector2(1, 0) },
          uColor: { value: toVec3(color) },
          uScale: { value: scale },
          uFrequency: { value: frequency },
          uWarpStrength: { value: warpStrength },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uMouseInfluence: { value: mouseInfluence },
          uParallax: { value: parallax },
          uNoise: { value: noise }
        }
      });
      materialRef.current = material;

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'high-performance'
      });
      rendererRef.current = renderer;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 1);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      container.appendChild(renderer.domElement);

      const timer = new THREE.Timer();

      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      const handleResize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        material.uniforms.uCanvas.value.set(w, h);
      };

      const debouncedResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 100);
      };

      handleResize();

      const ro = new ResizeObserver(debouncedResize);
      ro.observe(container);

      rotationRef.current = rotation;
      autoRotateRef.current = autoRotate;

      let readyFired = false;
      const loop = () => {
        timer.update();
        const dt = timer.getDelta();
        const elapsed = timer.getElapsed();
        material.uniforms.uTime.value = elapsed;

        const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;
        const rad = (deg * Math.PI) / 180;
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        material.uniforms.uRot.value.set(c, s);

        const cur = pointerCurrentRef.current;
        const tgt = pointerTargetRef.current;
        const amt = Math.min(1, dt * POINTER_SMOOTH);
        cur.lerp(tgt, amt);
        material.uniforms.uPointer.value.copy(cur);
        renderer.render(scene, camera);
        if (!readyFired) {
          readyFired = true;
          onReadyRef.current?.();
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      cleanup = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        ro.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement?.parentElement === container) {
          container.removeChild(renderer.domElement);
        }
        rendererRef.current = null;
        materialRef.current = null;
      };
    };

    initScene();

    return () => {
      canceled = true;
      if (cleanup) cleanup();
    };
  }, [color, frequency, mouseInfluence, noise, parallax, rotation, autoRotate, scale, speed, warpStrength]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };

    container.addEventListener('pointermove', handlePointerMove);
    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative overflow-hidden" />;
}
