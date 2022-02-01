import {ProjectRoot} from "./types";

const BASE_URL = "https://recruitment01.vercel.app/api";
const INIT_PROJECT_URL = `${BASE_URL}/init`
const PROJECT_URL = (id: string) => `${BASE_URL}/project/${id}`

export const getProject = (): ProjectRoot => {
  // console.log("got project");
  const project = {
    "id": "ckz46kr4d000709l3auj48jst-2272888977173997",
    "project": {
      "id": "ckz46kr4d000709l3auj48jst-2272888977173997",
      "name": "constitutional_harlequin_lark",
      "width": 496,
      "height": 922,
      "items": [
        {
          "id": "$177",
          "color": "#895a27",
          "rotation": 24,
          "x": 298,
          "y": 404,
          "width": 190,
          "height": 330
        },
        {
          "id": "$18",
          "color": "#e9bffe",
          "rotation": 120,
          "x": 368,
          "y": 309,
          "width": 202,
          "height": 143
        },
        {
          "id": "$151",
          "color": "#796c",
          "rotation": 292,
          "x": 202,
          "y": 301,
          "width": 166,
          "height": 212
        },
        {
          "id": "$77",
          "color": "#dd8d41",
          "rotation": 101,
          "x": 291,
          "y": 703,
          "width": 194,
          "height": 246
        }
      ]
    }
  };
  return project;
}