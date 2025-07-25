import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Login'
import Signup  from './Signup'
import MarketDashboard from './MarketDashboard' // Importing MarketDashboard

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/MarketDashboard' element={<MarketDashboard />}></Route>
        <Route path='*' element={<h1>Page Not Found</h1> }></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
