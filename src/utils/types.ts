export type ProjectRootType = {
  id: string;
  project: ProjectType;
}

export type ProjectType = {
  id: string;
  name: string;
  width: number;
  height: number;
  items?: (RectangleType)[] | null;
}

export type ProjectInitType = {
  id: string;
  name: string;
  modified: number;
}

export type RectangleType = {
  id: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Point = {
  x: number,
  y: number,
}