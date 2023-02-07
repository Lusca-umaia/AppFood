import Home from './Pages/Home/Home';
import Restaurant from './Pages/Restaurants_Lucas/Restaurant';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import FoodOrder from './Pages/Food Orders/FoodOrder';
import McDonalds from './Pages/Restautants_Thiago/McDonalds';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/orders' element={<FoodOrder />} />
          <Route path='/Restaurant/:id' element={<Restaurant />} />
          <Route path='/mcdonalds' element={<McDonalds />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
