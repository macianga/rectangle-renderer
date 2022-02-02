import {ProjectInitType, ProjectRootType} from "./types";

const BASE_URL = "https://recruitment01.vercel.app/api";
const INIT_PROJECT_URL = `${BASE_URL}/init`
const PROJECT_URL = (id: string) => `${BASE_URL}/project/${id}`

type apiErrorType = {
  error: number,
  message: string,
}

type apiResponse<ResponseSchema> = Promise<[responseOk: boolean, resp?: ResponseSchema, error?: apiErrorType]>


export const fetchProjectDetails = async (id: string = ""): apiResponse<ProjectRootType> => {
  if (!id) {
    const [responseOk, project] = (await fetchInitProject());
    if (responseOk) {
      id = project.id;
    }
  }
  const response = await fetch(PROJECT_URL(id))

  //handle api errors
  if (response.status !== 200) {
    const body = await response.text();
    try {
      return [false, {}, await JSON.parse(body)]
    } catch (e) {
      console.error(e);
      return [false, {}, {error: 0, message: body}]
    }
  }

  return [response.ok, await response.json()];
}

export const fetchInitProject = async (): apiResponse<ProjectInitType> => {
  const response = await fetch(INIT_PROJECT_URL)
  return [response.ok, response.ok ? (await response.json()) : {}];
}