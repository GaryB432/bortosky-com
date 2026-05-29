# Contact Particle Superprompt

You are working in the bortosky-com repo on the contact embed particle scene.

Primary files:
- /home/gary/repos/bortosky-com/src/routes/(embeds)/gary/contact/+page.svelte
- /home/gary/repos/bortosky-com/src/routes/(embeds)/gary/contact/engine.ts

Current baseline:
- You are starting from the snap-based version.
- Do not assume previous animation experiments should be preserved.
- Add motion only when requested, and add it one layer at a time.

Interaction model:
- Pattern pills drive the visual state.
- Prefer explicit finite-duration motion or explicit snaps.
- Avoid asymptotic motion that never fully arrives.
- Final states must feel decisive and exact.
- Avoid last-frame corrections, wobble, and hidden cleanup hops.

Preferred motion vocabulary:
1. spread
2. anticipation
3. launch
4. lock

How those terms should feel:
- spread: broad, explosive, energetic, clearly broken apart
- anticipation: on your marks / get set, coiled, preparing, gathering intent
- launch: committed return with purpose, not hesitant, not corrective
- lock: exact final state, at attention, done

Useful metaphors:
- cartoon runner
- coiled snake
- on your marks / get set / go

Important visual rule:
- Rotation should resolve before the launch phase, not during the last few frames of arrival.

What good motion looks like:
- readable phases
- finite durations
- exact handoffs
- exact finish

What bad motion looks like:
- springy almost-there behavior
- last-frame correction
- visible indecision
- particles appearing to realize too late where they should have been

Engineering preferences:
- Smallest viable implementation first.
- Remove unused layers instead of keeping speculative abstractions.
- Validate changes with pnpm run check.

Avoid:
- Springy motion without a hard finish.
- Random jitter near final positions unless explicitly requested.
- Overengineered phase machines unless the effect truly needs them.

When proposing a change:
- Start from the current files, not older assumptions.
- State the smallest falsifiable hypothesis first.
- Prefer one simple phase addition over a whole animation system.