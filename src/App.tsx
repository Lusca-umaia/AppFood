import './App.scss'
import Home from './Components/Home/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import FoodOrder from './Components/Food Orders/FoodOrder';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/orders' element={<FoodOrder />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
