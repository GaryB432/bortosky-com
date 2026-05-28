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
  hardBrake: boolean = false;

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
    const positionEpsilon = this.hardBrake ? 0.3 : 0.02;
    const velocityEpsilon = this.hardBrake ? 0.3 : 0.02;
    const rotationEpsilon = this.hardBrake ? 0.01 : 0.002;
    const scaleEpsilon = this.hardBrake ? 0.01 : 0.002;

    // Position
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;

    const dr = this.targetRotation - this.rotation;
    const ds = this.targetScale - this.scale;

    const isSettled =
      Math.abs(dx) < positionEpsilon &&
      Math.abs(dy) < positionEpsilon &&
      Math.abs(this.vx) < velocityEpsilon &&
      Math.abs(this.vy) < velocityEpsilon &&
      Math.abs(dr) < rotationEpsilon &&
      Math.abs(this.vr) < rotationEpsilon &&
      Math.abs(ds) < scaleEpsilon &&
      Math.abs(this.vs) < scaleEpsilon;

    if (isSettled) {
      this.x = this.tx;
      this.y = this.ty;
      this.vx = 0;
      this.vy = 0;
      this.rotation = this.targetRotation;
      this.vr = 0;
      this.scale = this.targetScale;
      this.vs = 0;
      return;
    }

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

      if (this.hardBrake) {
        const nextDx = this.tx - this.x;
        const nextDy = this.ty - this.y;

        if (Math.abs(nextDx) <= positionEpsilon || Math.sign(nextDx) !== Math.sign(dx)) {
          this.x = this.tx;
          this.vx = 0;
        }

        if (Math.abs(nextDy) <= positionEpsilon || Math.sign(nextDy) !== Math.sign(dy)) {
          this.y = this.ty;
          this.vy = 0;
        }
      }
    }

    // Rotation
    if (Math.abs(dr) < 0.001 && Math.abs(this.vr) < 0.001) {
      this.rotation = this.targetRotation;
      this.vr = 0;
    } else {
      this.vr += dr * (easing * 0.5);
      this.vr *= friction * 0.95;
      this.rotation += this.vr;

      if (this.hardBrake) {
        const nextDr = this.targetRotation - this.rotation;
        if (
          Math.abs(nextDr) <= rotationEpsilon ||
          Math.sign(nextDr) !== Math.sign(dr)
        ) {
          this.rotation = this.targetRotation;
          this.vr = 0;
        }
      }
    }

    // Scale
    if (Math.abs(ds) < 0.001 && Math.abs(this.vs) < 0.001) {
      this.scale = this.targetScale;
      this.vs = 0;
    } else {
      this.vs += ds * easing;
      this.vs *= friction;
      this.scale += this.vs;

      if (this.hardBrake) {
        const nextDs = this.targetScale - this.scale;
        if (Math.abs(nextDs) <= scaleEpsilon || Math.sign(nextDs) !== Math.sign(ds)) {
          this.scale = this.targetScale;
          this.vs = 0;
        }
      }
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
      p.startTime = 0;
      p.hardBrake = false;
      const angle = Math.random() * Math.PI * 2;
      const force = Math.random() * 140 + 80;
      p.vx = Math.cos(angle) * force;
      p.vy = Math.sin(angle) * force;
      p.rotation = (Math.random() - 0.5) * Math.PI * 2;
      p.targetRotation = p.rotation;
      p.vr = (Math.random() - 0.5) * 2;
      p.scale = 0.5 + Math.random() * 1.5;
      p.targetScale = 0.5 + Math.random() * 1.5;
      p.vs = (Math.random() - 0.5) * 0.3;
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
        p.hardBrake = false;
        p.targetRotation = (Math.random() - 0.5) * Math.PI * 4;
        p.targetScale = 0.5 + Math.random() * 1.5;
      } else {
        p.hardBrake = true;
        p.targetRotation = 0;
        p.targetScale = 1;
        p.startTime = 0;
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
