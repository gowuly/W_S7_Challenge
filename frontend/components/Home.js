import React from 'react'
import pizza from './images/pizza.jpg'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageClick = () => {
    navigate('/order'); // Navigate to "/order"
  };

  return (
    <div>
      <h2>
        Welcome to Bloom Pizza!
      </h2>
      {/* clicking on the img should navigate to "/order" */}
      <img alt="order-pizza" style={{ cursor: 'pointer' }} 
      src={pizza}
      onClick={handleImageClick} // Attach click handler
        />

      
    </div>
  )
}

export default Home
