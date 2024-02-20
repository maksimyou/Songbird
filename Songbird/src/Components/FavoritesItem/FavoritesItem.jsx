import React, { useState, useEffect } from 'react'
import './FavoritesItem.scss'
import addCart from '../../assets/add-to-shopping-cart.png'

import { UserContextFunc } from '../../Context/UserContext'


function FavoritesItem({ setGoodsFavoriteDep, id, image, name, price }) {

    const [removeFav, setRemoveFav] = useState(false)

    const { deleteFavorites, isUserId, } = UserContextFunc()
    useEffect(() => {
        if (removeFav) deleteFavorites({ idUser: isUserId.id, idGoods: id }); setGoodsFavoriteDep(true); setRemoveFav(false);
    }, [removeFav])
    return (
        <div className='favorites-item-container'>
            <div className="favorites-item-content">
                <div onClick={() => { setRemoveFav(true) }} className="favorites-item-close"></div>
                <div className="favorites-item-image"><img src={`http://89.104.66.35:5000/${image}`} alt="" /></div>
                <div className="favorites-item-name">{name}</div>
                <div className="favorites-item-price">{`${price} ₽`}</div>
                <div className="favorites-item-add-basket"><img src={addCart} alt="" />Добавить в корзину</div>
            </div>
        </div>
    )
}

export default FavoritesItem