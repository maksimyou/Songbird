import React from 'react'
import './HowWeAreWorkingCard.scss'
function HowWeAreWorkingCard({number,title,text}) {
  return (
    <div className='how-we-are-working-card-container'>
        <div className="how-we-are-working-card-content">
            <div className="how-we-are-working-card-number">{number}</div>
            <div className="how-we-are-working-card-title">{title}</div>
            <div className="how-we-are-working-card-text">{text}</div>
        </div>
    </div>
  )
}

export default HowWeAreWorkingCard