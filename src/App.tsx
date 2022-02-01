import './App.css'
import {useState} from "react";
import {fetchProjectDetails} from "./utils/apiHelpers";
import {ProjectRootType, RectangleType} from "./utils/types";
import React, {Fragment} from 'react';
import {getBoundingBox, getContrastColor} from "./utils/utils";

function App() {
  const [projectIdInput, setProjectIdInput] = useState("")
  const [project, setProject] = useState<ProjectRootType>();

  const buttonClicked = async () => {
    setProject(await fetchProjectDetails(projectIdInput));
  }

  const getBoundingBoxComponent = (rect: RectangleType) => {
    const boundingBox = getBoundingBox(rect);
    return (
      <rect
        x={boundingBox.x - boundingBox.width / 2}
        y={boundingBox.y - boundingBox.height / 2}
        width={boundingBox.width}
        height={boundingBox.height}
        stroke={boundingBox.color}
        fillOpacity="0"
        transform={`rotate(${boundingBox.rotation} ${boundingBox.x} ${boundingBox.y})`}
      />
    )
  }


  return (
    <div className="main-content">
      <div className="input-section">
        <span className="input-description">
          Project ID:
        </span>
        <input
          type="text"
          value={projectIdInput}
          onChange={e => setProjectIdInput(e.target.value)}
          placeholder="For random leave empty :)"
        />
        <button
          onClick={buttonClicked}
        >Fetch
        </button>
      </div>
      <hr/>
      {
        project?.project && (
          <div>
            <div className="info-section">
              <span style={{display: "block"}}>Name: <b>{project.project.name}</b></span>
              <span style={{display: "block"}}>ID: <b>{project.project.id}</b></span>
            </div>
            <svg className="svg-container" viewBox={`0 0 ${project.project.width} ${project.project.height}`}>
              {
                project.project.items?.map((rect) => {
                  return (
                    <Fragment key={rect.id}>
                      <rect
                        x={rect.x - rect.width / 2}
                        y={rect.y - rect.height / 2}
                        width={rect.width}
                        height={rect.height}
                        style={{fill: rect.color}}
                        transform={`rotate(${rect.rotation} ${rect.x} ${rect.y})`}
                      />
                      <ellipse
                        cx={rect.x}
                        cy={rect.y}
                        rx={3}
                        ry={3}
                        style={{fill: getContrastColor(rect.color)}}
                      />
                      {getBoundingBoxComponent(rect)}
                      <text
                        x={rect.x + 5}
                        y={rect.y - 5}
                        style={{fill: getContrastColor(rect.color)}}
                      >
                        {rect.rotation}°
                      </text>
                    </Fragment>
                  )
                })
              }
            </svg>
          </div>
        )
      }
    </div>
  )
}

export default App
