import {ProjectInitType, ProjectRootType} from "./types";

const BASE_URL = "https://recruitment01.vercel.app/api";
export const INIT_PROJECT_URL = `${BASE_URL}/init`
export const PROJECT_URL = (id: string) => `${BASE_URL}/project/${id}`

type jsonResponseWithErrorType<Type> = {
  response: Type,
  error: string,
}

type apiResponseType<ResponseSchema> = [responseOk: boolean, resp: jsonResponseWithErrorType<ResponseSchema>]


const getResponseError = async (request: Response,
                                defaultErrorMessage = "An error has occurred"): Promise<string> => {
  const body = await request.text();
  try {
    return await JSON.parse(body).message
  } catch (e) {
    console.error(e);
    return defaultErrorMessage;
  }
}

const getJson = async <SchemaType>(response: Response): Promise<SchemaType> => {
  // The server may return null or malformed json
  try {
    return await response.json()
  } catch {
    return <SchemaType>{}
  }
}

export const request = async <JSONSchema>(url: string): Promise<apiResponseType<JSONSchema>> => {
  const response = await fetch(url);

  if (response.status === 200 && response.ok) {
    const json = await getJson<JSONSchema>(response);
    return [response.ok, {response: json, error: ""}]
  }

  const error = await getResponseError(response)
  return [response.ok, {response: <JSONSchema>{}, error: error}]
}


export const fetchProjectDetails = async (id: string = ""): Promise<apiResponseType<ProjectRootType>> => {
  if (!id) {
    const [responseOk, project] = (await request<ProjectInitType>(INIT_PROJECT_URL));
    if (!responseOk)
      return [responseOk, project]
    id = project.response.id;
  }
  return await request<ProjectRootType>(PROJECT_URL(id))
}