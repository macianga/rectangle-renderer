import {PointType, ProjectRootType, RectangleType} from "./types";

const rotate_point = (point: PointType, centerPoint: PointType, angle: number): PointType => {
  const sinVal = Math.sin(angle * (Math.PI / 180));
  const cosVal = Math.cos(angle * (Math.PI / 180));

  // translate point back to origin:
  point.x -= centerPoint.x;
  point.y -= centerPoint.y;

  // rotate point
  const xNew = point.x * cosVal - point.y * sinVal;
  const yNew = point.x * sinVal + point.y * cosVal;

  // translate point back:
  point.x = xNew + centerPoint.x;
  point.y = yNew + centerPoint.y;
  return {x: point.x, y: point.y};
}

export const getBoundingBox = (rect: RectangleType): RectangleType => {
  const rectangleCorners = [
    {x: rect.x - rect.width / 2, y: rect.y - rect.height / 2},
    {x: rect.x - rect.width / 2, y: rect.y + rect.height / 2},
    {x: rect.x + rect.width / 2, y: rect.y - rect.height / 2},
    {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2},
  ]

  const pointsTranslated = rectangleCorners.map((point) =>
    rotate_point(point, {x: rect.x, y: rect.y}, rect.rotation))

  const maxX = Math.max(...pointsTranslated.map((p) => p.x))
  const maxY = Math.max(...pointsTranslated.map((p) => p.y))
  const minX = Math.min(...pointsTranslated.map((p) => p.x))
  const minY = Math.min(...pointsTranslated.map((p) => p.y))

  const width = maxX - minX;
  const height = maxY - minY;

  return {
    x: minX + width / 2,
    y: minY + height / 2,
    width: width,
    height: height,
    rotation: 0,
    color: "blue",
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

export const validateProjectData = (data: ProjectRootType): boolean => {
  if (!data.id) return false;
  if (!data.project) return false;
  const project = data.project;
  if (!project.id) return false;
  if (!project.name) return false;
  if (project.width <= 0 || project.height <= 0) return false
  if (!project.items?.length) return false;
  const items = project.items;
  return items.every((rect) => {
    return rect.id && rect.height >= 0 && rect.width >= 0 && rect.color && rect.rotation > 0;
  })
}