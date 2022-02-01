import './App.css'
import {useEffect, useState} from "react";
import {getProject} from "./utils/apiHelpers";

function App() {
  const [projectIdInput, setProjectIdInput] = useState("")
  const [project, setProject] = useState(getProject());


  useEffect(() => {
    // console.log(project.project.items)
  }, [])

  const buttonClicked = () => {
    console.log("asd");
    //translate(${-rect.width / 2}, ${-rect.height / 2})
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
      <svg className="svg-rectangles" style={{width: project.project.width, height: project.project.height}}>
        {
          project.project.items?.map((rect) => {
            return (
              <>
                <rect
                  key={rect.id}
                  x={rect.x - rect.width/2}
                  y={rect.y - rect.height/2}
                  width={rect.width}
                  height={rect.height}
                  style={{fill: rect.color}}
                  transform={`rotate(${rect.rotation} ${rect.x} ${rect.y})`}
                />
                <ellipse key={rect.id + "e"} cx={rect.x} cy={rect.y} rx={5} ry={5} style={{fill: "blue"}}/>
                <text key={rect.id + "t"} x={rect.x + 5} y={rect.y - 5} className="small">{rect.rotation}°</text>
              </>
            )

          })
        }
      </svg>
    </div>
  )
}

export default App
