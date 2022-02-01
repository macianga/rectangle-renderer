import {ProjectInitType, ProjectRootType} from "./types";

const BASE_URL = "https://recruitment01.vercel.app/api";
const INIT_PROJECT_URL = `${BASE_URL}/init`
const PROJECT_URL = (id: string) => `${BASE_URL}/project/${id}`

export const fetchProjectDetails = async (id: string = ""): Promise<{ok: boolean, project: ProjectRootType}> => {
  if(!id){
    const {ok, project} = (await fetchInitProject());
    if(ok){
      id = project.id;
    }
  }
  const response = await fetch(PROJECT_URL(id))

  return {ok: response.ok, project: response.ok ? (await response.json()): {}};
}

export const fetchInitProject = async(): Promise<{ok: boolean, project: ProjectInitType}> => {
  const response = await fetch(INIT_PROJECT_URL)
  return {ok: response.ok, project: response.ok ? (await response.json()): {}};
}