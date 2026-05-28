export interface Point {
  x: number;
  y: number;
}

export class Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;

  // Staggering
  startTime: number = 0;

  // Over-the-top properties
  rotation: number = 0;
  targetRotation: number = 0;
  vr: number = 0;

  scale: number = 1;
  targetScale: number = 1;
  vs: number = 0;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.tx = x;
    this.ty = y;
    this.vx = 0;
    this.vy = 0;
    this.size = size;
  }

  update(currentTime: number): void {
    if (currentTime < this.startTime) return;

    const easing = 0.1;
    const friction = 0.8;

    // Position
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;

    if (
      Math.abs(dx) < 0.01 &&
      Math.abs(dy) < 0.01 &&
      Math.abs(this.vx) < 0.01 &&
      Math.abs(this.vy) < 0.01
    ) {
      this.x = this.tx;
      this.y = this.ty;
      this.vx = 0;
      this.vy = 0;
    } else {
      this.vx += dx * easing;
      this.vy += dy * easing;
      this.vx *= friction;
      this.vy *= friction;
      this.x += this.vx;
      this.y += this.vy;
    }

    // Rotation
    const dr = this.targetRotation - this.rotation;
    if (Math.abs(dr) < 0.001 && Math.abs(this.vr) < 0.001) {
      this.rotation = this.targetRotation;
      this.vr = 0;
    } else {
      this.vr += dr * (easing * 0.5);
      this.vr *= friction * 0.95;
      this.rotation += this.vr;
    }

    // Scale
    const ds = this.targetScale - this.scale;
    if (Math.abs(ds) < 0.001 && Math.abs(this.vs) < 0.001) {
      this.scale = this.targetScale;
      this.vs = 0;
    } else {
      this.vs += ds * easing;
      this.vs *= friction;
      this.scale += this.vs;
    }
  }
}

export class ParticleEngine {
  particles: Particle[] = [];
  stageSize: number;
  particleSize: number = 4;

  constructor(stageSize: number) {
    this.stageSize = stageSize;
  }

  init(count: number, particleSize: number): void {
    const center = this.stageSize / 2;
    this.particleSize = particleSize;
    this.particles = Array.from(
      { length: count },
      () => new Particle(center, center, particleSize),
    );
  }

  explosion(): void {
    this.particles.forEach((p) => {
      p.startTime = 0; // Reset stagger on explosion
      const angle = Math.random() * Math.PI * 2;
      const force = Math.random() * 100 + 50;
      p.vx = Math.cos(angle) * force;
      p.vy = Math.sin(angle) * force;

      p.vr = (Math.random() - 0.5) * 2;
      p.scale = Math.random() * 6 + 3;
    });
  }

  setTargets(
    points: Point[],
    phase: "pause" | "finalize",
    pattern: string,
    currentTime: number,
    offsetY: number = 0,
  ): void {
    this.particles.forEach((p, i) => {
      // Set position targets
      if (i < points.length) {
        p.tx = points[i].x;
        p.ty = points[i].y;
      } else {
        const last = points[points.length - 1];
        p.tx = last?.x ?? this.stageSize / 2;
        p.ty = last?.y ?? this.stageSize / 2;
      }

      if (phase === "pause") {
        p.targetRotation = (Math.random() - 0.5) * Math.PI * 4;
        p.targetScale = Math.random() * 4 + 2;

        // Hourglass pause: gather near the top of the SCREEN
        if (pattern === "hourglass") {
          // Since the context is translated by offsetY, we go negative to reach the top of screen
          const screenTopY = -offsetY - 50;
          p.tx = this.stageSize / 2 + (Math.random() - 0.5) * 60;
          p.ty = screenTopY + (Math.random() - 0.5) * 40;
        }
      } else {
        p.targetRotation = 0;
        p.targetScale = 1;

        if (pattern === "random") {
          p.targetRotation = (Math.random() - 0.5) * Math.PI * 0.5;
          p.targetScale = Math.random() * 2;
        }

        if (pattern === "settle") {
          p.targetRotation = Math.PI / 4;
          p.targetScale = 0.8;
        }

        // Hourglass finalize: stagger the fall
        if (pattern === "hourglass") {
          p.startTime = currentTime + i * 2; // Staggered flow
        } else {
          p.startTime = 0;
        }
      }
    });
  }

  update(currentTime: number): void {
    this.particles.forEach((p) => p.update(currentTime));
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    this.particles.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(p.scale, p.scale);

      ctx.fillRect(
        -p.size / 2,
        -p.size / 2,
        p.size + 0.2, // slightly less overlap to see shapes when large
        p.size + 0.2,
      );
      ctx.restore();
    });
  }
}
