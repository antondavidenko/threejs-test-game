export function rand_range(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function rand_normalish(): number {
    const r = Math.random() + Math.random() + Math.random() + Math.random();
    return (r / 4.0) * 2.0 - 1;
}

export function rand_int(min: number, max: number): number {
    return Math.round(rand_range(min, max));
}

export function lerp(x, a, b): number {
    return x * (b - a) + a;
}

export function smoothstep(x: number, a: number, b: number): number {
    x = x * x * (3.0 - 2.0 * x);
    return x * (b - a) + a;
}

export function smootherstep(x: number, a: number, b: number): number {
    x = x * x * x * (x * (x * 6 - 15) + 10);
    return x * (b - a) + a;
}

export function clamp(x: number, a: number, b: number): number {
    return Math.min(Math.max(x, a), b);
}

export function sat(x: number): number {
    return Math.min(Math.max(x, 0.0), 1.0);
}