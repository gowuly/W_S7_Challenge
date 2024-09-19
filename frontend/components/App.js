import React from 'react'
import Home from './Home'
import Form from './Form'
import { Routes, Route, NavLink } from 'react-router-dom'


function App() {
  return (
    <div id="app">
      <nav>
      <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? 'active' : '')} 
        >
          Home
          
        </NavLink>
        <NavLink 
          to="/order" 
          className={({ isActive }) => (isActive ? 'active' : '')} 
        >
          Order
        </NavLink>
        {/* NavLinks here */}
      </nav>
      
      {/* Route and Routes here */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/order' element={<Form/>}/>
      </Routes>
      
    </div>
  )
}

export default App
