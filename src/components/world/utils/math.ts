export function lerp(x, a, b): number {
  return x * (b - a) + a;
}

export function clamp(x: number, a: number, b: number): number {
  return Math.min(Math.max(x, a), b);
}

export function sat(x: number): number {
  return Math.min(Math.max(x, 0.0), 1.0);
}
