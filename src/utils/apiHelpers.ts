import {ProjectInitType, ProjectRootType} from "./types";

const BASE_URL = "https://recruitment01.vercel.app/api";
const INIT_PROJECT_URL = `${BASE_URL}/init`
const PROJECT_URL = (id: string) => `${BASE_URL}/project/${id}`

export const fetchProjectDetails = async (id: string = ""): Promise<ProjectRootType> => {
  if(!id){
    id = (await fetchInitProject()).id;
  }
  const response = await fetch(PROJECT_URL(id))
  return await response.json();
}

export const fetchInitProject = async(): Promise<ProjectInitType> => {
  const response = await fetch(INIT_PROJECT_URL)
    return await response.json();
}