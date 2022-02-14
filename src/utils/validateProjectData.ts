import {ProjectRootType} from "./types";

export const validateProjectData = (data: ProjectRootType): boolean => {
  if (!data.id) return false;
  if (!data.project) return false;
  const project = data.project;
  if (!project.id) return false;
  if (!project.name) return false;
  if (project.width <= 0 || project.height <= 0) return false
  if (!project.items?.length) return false;
  return project.items.every((rect) => {
    return rect.id && rect.height >= 0 && rect.width >= 0 && rect.color && rect.rotation > 0;
  })
}