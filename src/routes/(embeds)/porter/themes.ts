type PorterTheme = {
  name: string;
  bg: string;
  grid: string;
  gridMinorOpacity: number;
  gridMajorOpacity: number;
  crosshair: string;
  cornerMarkerFill: string;
  cornerMarkerStroke: string;
  cornerMarkerDot: string;
  diamondFill: string;
  diamondFillOpacity: number;
  diamondStroke: string;
  labelPrimary: string;
  labelSecondary: string;
  labelTertiary: string;
  statusPrimary: string;
  statusSecondary: string;
  cornerLabelShiftPx: number;
  cornerLabelShiftDurationMs: number;
  cornerLabelShiftEasing: string;
};

export const themes = {
  engineering: {
    name: "Engineering",
    bg: "#0a1128",
    grid: "#003366",
    gridMinorOpacity: 0.3,
    gridMajorOpacity: 0.5,
    crosshair: "#003366",
    cornerMarkerFill: "#000000",
    cornerMarkerStroke: "#00ffcc",
    cornerMarkerDot: "#00ffcc",
    diamondFill: "#00ffcc",
    diamondFillOpacity: 0.03,
    diamondStroke: "#00ffcc",
    labelPrimary: "#00ffcc",
    labelSecondary: "#88ffea",
    labelTertiary: "#00aaff",
    statusPrimary: "#00aaff",
    statusSecondary: "#00ffcc",
    cornerLabelShiftPx: 50,
    cornerLabelShiftDurationMs: 800,
    cornerLabelShiftEasing: "ease-out",
  },
  mapsLand: {
    name: "Maps Land",
    bg: "#e8f1df",
    grid: "#8ca47c",
    gridMinorOpacity: 0.24,
    gridMajorOpacity: 0.42,
    crosshair: "#6f8d62",
    cornerMarkerFill: "#fffdf2",
    cornerMarkerStroke: "#5e7f4d",
    cornerMarkerDot: "#5e7f4d",
    diamondFill: "#8ebf74",
    diamondFillOpacity: 0.18,
    diamondStroke: "#4e6f3f",
    labelPrimary: "#2f4b2a",
    labelSecondary: "#3f6540",
    labelTertiary: "#6f5a3d",
    statusPrimary: "#31565d",
    statusSecondary: "#2f4b2a",
    cornerLabelShiftPx: 42,
    cornerLabelShiftDurationMs: 1000,
    cornerLabelShiftEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
} satisfies Record<string, PorterTheme>;

export type ThemeKey = keyof typeof themes;
