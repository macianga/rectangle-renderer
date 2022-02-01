export type ProjectRoot = {
  id: string;
  project: Project;
}

type Project = {
  id: string;
  name: string;
  width: number;
  height: number;
  items?: (RectangleEntity)[] | null;
}

type RectangleEntity = {
  id: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Rectangle = RectangleEntity