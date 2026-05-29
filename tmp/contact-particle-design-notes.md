# Contact Particle Design Notes

## Goal

Give the next context a concise shared language for motion feel without dragging along old implementation bias.

Relevant files:
- /home/gary/repos/bortosky-com/src/routes/(embeds)/gary/contact/+page.svelte
- /home/gary/repos/bortosky-com/src/routes/(embeds)/gary/contact/engine.ts

## Current product intent

- The particles represent visual layouts for Gary's contact code.
- Pattern pills are the main interaction surface.
- Simplicity matters more than preserving past experiments.
- Start from what the UI currently does, not what past experiments attempted.

## Shared motion vocabulary

- spread: particles break apart broadly and energetically
- anticipation: particles gather intent before the committed move
- launch: particles drive to their destination with purpose
- lock: particles finish exactly and visibly look done

## Desired feeling

- Motion should read like a short story with clear beats.
- The best metaphors so far are:
  - a cartoon runner taking off
  - a coiled snake
  - on your marks / get set / go
- Final state should feel like attention: composed, exact, finished.

## Motion lessons learned

- Duration-based lerp is better for this work than asymptotic smoothing.
- If a motion should be done in 150ms, model it directly as a 150ms transition.
- Random duration ranges are fine inside a phase, but only if the next phase waits for the slowest member or the phase is intentionally loose.
- Late cleanup snaps can feel good only when they are invisible; if they are visible, they read as indecision.
- Visible last-frame correction is especially bad for rotation.
- Rotation should already be resolved before the particle makes its final committed home move.

## Visual rules

- Explosion or spread should feel broad and energetic.
- Anticipation should feel like gathering intent, not wandering.
- Launch should feel committed, not corrective.
- Lock should not look like cleanup.

## Anti-patterns discovered

- Carrying too many animation concepts at once makes debugging feel impossible.
- Overly broad tuning objects can preserve outdated opinions.
- Random jitter near final positions often creates visible corrective hops.
- If phase boundaries are not exact, particles can appear to realize they are still misaligned in the last frames.

## Engineering guidance for future work

- Keep the baseline small.
- Add one motion idea at a time.
- Prefer naming that describes the current behavior plainly.
- Remove dormant machinery unless it is intentionally parked and clearly non-controlling.
- Validate each change with pnpm run check.

## Collaboration notes

- The user is emotionally tuned to motion quality and notices tiny finish defects.
- Explanations that teach why a motion model behaves the way it does are helpful.
- Minimal, concrete changes are preferred over elaborate speculative systems.