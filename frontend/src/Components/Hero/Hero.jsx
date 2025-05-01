import React from 'react'
import './Hero.css'
import hero_image from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <div className="hero">
        <div className="hero-left">
            <h2>Trendy Styles. Everyday Comfort.</h2>
            <div>
                <p>New</p>
                <p>Collection</p>
            </div>
            <h1>EXCLUSIVE OFFERS</h1>   
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero