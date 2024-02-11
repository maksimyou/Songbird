import React from 'react'
import './Card.scss'
import like from '../../assets/like.svg'
import imgCard from '../../assets/img-card.png'

import likeColor from '../../assets/like-color.svg'

function Card() {
    return (
        <div className='card-container'>
            <div className="card-content">
                <div className="card-img"><img src={imgCard} alt="" /></div>
                <div className="card-name">Торт "Наполеон" классический</div>
                <div className="number-of-purchases-and-liked">
                    <div className="number-of-purchases">Купили более 300 раз</div>
                    <div className="number-of-liked">(96)<img src={likeColor} alt="" /> </div>
                </div>
                <div className="card-price">1 600 ₽<span>1 кг.</span></div>
                <div className="card-choos-weight">
                    <div className="card-choos-top">Выберите вес <img src="" alt="" /></div>
                    <ul>
                        <li>1кг.</li>
                        <li>2кг.</li>
                        <li>3кг.</li>
                        <li>4кг.</li>
                    </ul>
                </div>
                <div className="add-to-cart-and-like">
                    <button className='add-to-cart'>В корзину</button>
                    <img className='card-like' src={like} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Card