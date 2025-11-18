import './App.css'
import { BadButton } from "bad-ui-fonanf";

function App() {
  return (
    <>
      <div>
        <BadButton level="mild">Mildly annoying button</BadButton>
      <BadButton level="annoying">Annoying button</BadButton>
      <BadButton level="unusable" onClick={() => alert("Why did you click this?")}>
        Completely unusable button
      </BadButton>
      </div>
    </>
  )
}

export default App
