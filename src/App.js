import "./App.css"
import Home from "./Home"
import { Routes, Route} from 'react-router-dom';
import Details from "./Details"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Details/:id' element={<Details />} />
    </Routes>
  )
}

export default App
