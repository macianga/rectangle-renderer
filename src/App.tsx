import './App.css'
import {useState} from "react";

function App() {
  const [projectIdInput, setProjectIdInput] = useState("")

  const buttonClicked = () => {
    console.log("asd");
  }

  return (
    <div className="main-content">
      <div className="inputs">
        <span>
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
      <svg height="100%" width="100%">
      </svg>
    </div>
  )
}

export default App
