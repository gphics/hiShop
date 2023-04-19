import React from 'react'
import LandingPageComponent from '../../Components/LandingPageComponent'
function HomePage() {
  return (
    <div className='home_page'>
      {LandingPageComponent.map((Item, i)=> <Item key={i*778} />)}
    </div>
  )
}

export default HomePage