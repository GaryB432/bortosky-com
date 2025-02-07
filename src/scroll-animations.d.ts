/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-ordering */

type Axis = "horizontal" | "vertical" | "block" | "inline";

interface ViewTimelineOptions {
  subject?: Element | null;
  axis?: Axis;
}

interface ViewTimeline extends AnimationTimeline {
  subject: Element | null;
  axis: Axis;
}

declare var ViewTimeline: {
  new (options?: ViewTimelineOptions): ViewTimeline;
};

interface ScrollTimelineOptions extends KeyframeAnimationOptions {
  rangeStart?: number | string;
  rangeEnd?: number | string;
}

interface Element {
  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: ScrollTimelineOptions,
  ): Animation;
}
