import {RectangleType} from "./types";

export const getBoundingBox = (rect: RectangleType)=>{

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

export const getContrastColor = (color: string): string =>{
  const darkColor = "black"
  const lightColor = "white"
  const rgbColor = hexToRgb(color);
  if(!rgbColor) return lightColor

  // 186 is a threshold between light and dark colors, not precise but good enough
  return (rgbColor.r*0.299 + rgbColor.g*0.587 + rgbColor.b*0.114) > 186 ? darkColor : lightColor;
}