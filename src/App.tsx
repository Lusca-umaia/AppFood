import './App.scss'
import Home from './Components/Home/Home';
import Pizza from './Components/Pizza_Lucas/Pizza';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import FoodOrder from './Components/Food Orders/FoodOrder';
import McDonalds from './Components/McDonalds/McDonalds';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/orders' element={<FoodOrder />} />
          <Route path='/Pizza/:id' element={<Pizza />} />
          <Route path='/mcdonalds' element={<McDonalds />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
