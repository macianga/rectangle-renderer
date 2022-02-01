import {RectangleType} from "./types";

const rotate_point = (x, y, cx, cy, angle) => {
  const s = Math.sin(angle * (Math.PI / 180));
  const c = Math.cos(angle * (Math.PI / 180));

  // translate point back to origin:
  x -= cx;
  y -= cy;

  // rotate point
  const xnew = x * c - y * s;
  const ynew = x * s + y * c;

  // translate point back:
  x = xnew + cx;
  y = ynew + cy;
  return {x: x, y: y};
}

export const getBoundingBox = (rect: RectangleType): RectangleType => {
  const points = [
    {x: rect.x - rect.width / 2, y: rect.y - rect.height / 2},
    {x: rect.x - rect.width / 2, y: rect.y + rect.height / 2},
    {x: rect.x + rect.width / 2, y: rect.y - rect.height / 2},
    {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2},
  ]

  const pointsTranslated = points.map((point) => rotate_point(point.x, point.y, rect.x, rect.y, rect.rotation))
  const maxX = Math.max(...pointsTranslated.map((p)=>p.x))
  const maxY = Math.max(...pointsTranslated.map((p)=>p.y))
  const minX = Math.min(...pointsTranslated.map((p)=>p.x))
  const minY = Math.min(...pointsTranslated.map((p)=>p.y))

  const width = maxX - minX;
  const height = maxY - minY;

  return {
    x: minX + width/2,
    y: minY + height/2,
    width: width,
    height: height,
    rotation: 0,
    color: "red",
    id: `${minX}${minY}`
  }
}

const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export const getContrastColor = (color: string): string => {
  const darkColor = "black"
  const lightColor = "white"
  const rgbColor = hexToRgb(color);
  if (!rgbColor) return lightColor

  // 186 is a threshold between light and dark colors, not precise but good enough
  return (rgbColor.r * 0.299 + rgbColor.g * 0.587 + rgbColor.b * 0.114) > 186 ? darkColor : lightColor;
}