import qrcode from "qrcode-generator";

export interface Point {
  x: number;
  y: number;
}

export interface QRData {
  points: Point[];
  cellSize: number;
}

export function getQRPoints(url: string, stageSize: number): QRData {
  const qr = qrcode(0, "L");
  qr.addData(url);
  qr.make();

  const count = qr.getModuleCount();
  const cellSize = stageSize / count;
  const points: Point[] = [];

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) {
        points.push({
          x: col * cellSize + cellSize / 2,
          y: row * cellSize + cellSize / 2,
        });
      }
    }
  }

  return { points, cellSize };
}
