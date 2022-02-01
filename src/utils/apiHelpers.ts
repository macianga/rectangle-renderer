import {ProjectInitType, ProjectRootType} from "./types";

const BASE_URL = "https://recruitment01.vercel.app/api";
const INIT_PROJECT_URL = `${BASE_URL}/init`
const PROJECT_URL = (id: string) => `${BASE_URL}/project/${id}`

type apiResponse<ResponseSchema> = Promise<[responseOk: boolean, resp: ResponseSchema]>

export const fetchProjectDetails = async (id: string = ""): apiResponse<ProjectRootType> => {
  if(!id){
    const [responseOk, project] = (await fetchInitProject());
    if(responseOk){
      id = project.id;
    }
  }
  const response = await fetch(PROJECT_URL(id))

  return [response.ok, response.ok ? (await response.json()): {}];
}

export const fetchInitProject = async(): apiResponse<ProjectInitType> => {
  const response = await fetch(INIT_PROJECT_URL)
  return [response.ok, response.ok ? (await response.json()): {}];
}