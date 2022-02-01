import './App.css'
import {useEffect, useState} from "react";
import {fetchInitProject, fetchProjectDetails} from "./utils/apiHelpers";
import {ProjectRootType} from "./utils/types";
import React, { Fragment } from 'react';

function App() {
  const [projectIdInput, setProjectIdInput] = useState("")
  const [project, setProject] = useState<ProjectRootType>();

  const buttonClicked = async () => {
    setProject(await fetchProjectDetails(projectIdInput));
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
                      <ellipse cx={rect.x} cy={rect.y} rx={5} ry={5} style={{fill: "blue"}}/>
                      <text x={rect.x + 5} y={rect.y - 5} className="small">{rect.rotation}°</text>
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
