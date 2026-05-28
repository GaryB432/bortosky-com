export interface Point {
  x: number;
  y: number;
}

export const PARTICLE_TUNING = {
  easing: 0.1,
  friction: 0.8,
  settle: {
    normal: {
      positionEpsilon: 0.02,
      velocityEpsilon: 0.02,
      rotationEpsilon: 0.002,
      scaleEpsilon: 0.002,
    },
    hardBrake: {
      positionEpsilon: 0.3,
      velocityEpsilon: 0.3,
      rotationEpsilon: 0.02,
      scaleEpsilon: 0.02,
    },
  },
  explosion: {
    minForce: 80,
    maxForce: 220,
    rotationRange: Math.PI * 2,
    rotationVelocityRange: 2,
    scaleMin: 0.5,
    scaleMax: 2.0,
    scaleVelocityRange: 0.3,
  },
  pause: {
    rotationRange: Math.PI * 4,
    scaleMin: 0.5,
    scaleMax: 2.0,
  },
  setPose: {
    scaleMin: 0.82,
    scaleMax: 0.95,
  },
  finalize: {
    dashEase: 0.38,
  },
} as const;

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

    const easing = PARTICLE_TUNING.easing;
    const friction = PARTICLE_TUNING.friction;
    const settle = this.hardBrake
      ? PARTICLE_TUNING.settle.hardBrake
      : PARTICLE_TUNING.settle.normal;
    const { positionEpsilon, velocityEpsilon, rotationEpsilon, scaleEpsilon } = settle;

    // Position
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;

    const dr = this.targetRotation - this.rotation;
    const ds = this.targetScale - this.scale;

    if (this.hardBrake) {
      const dashEase = PARTICLE_TUNING.finalize.dashEase;
      this.x += dx * dashEase;
      this.y += dy * dashEase;
      this.rotation += dr * dashEase;
      this.scale += ds * dashEase;

      if (Math.abs(this.tx - this.x) <= positionEpsilon) this.x = this.tx;
      if (Math.abs(this.ty - this.y) <= positionEpsilon) this.y = this.ty;
      if (Math.abs(this.targetRotation - this.rotation) <= rotationEpsilon) {
        this.rotation = this.targetRotation;
      }
      if (Math.abs(this.targetScale - this.scale) <= scaleEpsilon) {
        this.scale = this.targetScale;
      }

      this.vx = 0;
      this.vy = 0;
      this.vr = 0;
      this.vs = 0;
      return;
    }

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
    }

    // Rotation
    if (Math.abs(dr) < 0.001 && Math.abs(this.vr) < 0.001) {
      this.rotation = this.targetRotation;
      this.vr = 0;
    } else {
      this.vr += dr * (easing * 0.5);
      this.vr *= friction * 0.95;
      this.rotation += this.vr;
    }

    // Scale
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
    const {
      minForce,
      maxForce,
      rotationRange,
      rotationVelocityRange,
      scaleMin,
      scaleMax,
      scaleVelocityRange,
    } = PARTICLE_TUNING.explosion;

    this.particles.forEach((p) => {
      p.startTime = 0;
      p.hardBrake = false;
      const angle = Math.random() * Math.PI * 2;
      const force = Math.random() * (maxForce - minForce) + minForce;
      p.vx = Math.cos(angle) * force;
      p.vy = Math.sin(angle) * force;
      p.rotation = (Math.random() - 0.5) * rotationRange;
      p.targetRotation = p.rotation;
      p.vr = (Math.random() - 0.5) * rotationVelocityRange;
      p.scale = Math.random() * (scaleMax - scaleMin) + scaleMin;
      p.targetScale = Math.random() * (scaleMax - scaleMin) + scaleMin;
      p.vs = (Math.random() - 0.5) * scaleVelocityRange;
    });
  }

  setTargets(
    points: Point[],
    phase: "pause" | "set" | "finalize",
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
        p.targetRotation =
          (Math.random() - 0.5) * PARTICLE_TUNING.pause.rotationRange;
        p.targetScale =
          Math.random() *
            (PARTICLE_TUNING.pause.scaleMax - PARTICLE_TUNING.pause.scaleMin) +
          PARTICLE_TUNING.pause.scaleMin;
      } else if (phase === "set") {
        p.hardBrake = false;
        p.targetRotation = 0;
        p.targetScale =
          Math.random() *
            (PARTICLE_TUNING.setPose.scaleMax -
              PARTICLE_TUNING.setPose.scaleMin) +
          PARTICLE_TUNING.setPose.scaleMin;
      } else {
        p.hardBrake = true;
        p.targetRotation = 0;
        p.targetScale = 1;
        p.startTime = 0;
      }
    });
  }

  snapToTargets(points: Point[]): void {
    this.particles.forEach((p, i) => {
      const target = points[i] ?? points[points.length - 1];
      const x = target?.x ?? this.stageSize / 2;
      const y = target?.y ?? this.stageSize / 2;

      p.x = x;
      p.y = y;
      p.tx = x;
      p.ty = y;
      p.vx = 0;
      p.vy = 0;
      p.rotation = 0;
      p.targetRotation = 0;
      p.vr = 0;
      p.scale = 1;
      p.targetScale = 1;
      p.vs = 0;
      p.hardBrake = false;
      p.startTime = 0;
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
