import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './FavoritesItem.scss'
import addCart from '../../assets/add-to-shopping-cart.png'
import deletee from '../../assets/delete.png'

import { UserContextFunc } from '../../Context/UserContext'


function FavoritesItem({ category, setGoodsFavoriteDep, id, image, name, price }) {

    const [removeFav, setRemoveFav] = useState(false)
    const [addBas, setAddBas] = useState(false)
    console.log(category)
    const { deleteFavorites, isUserId, addBasket } = UserContextFunc()
    useEffect(() => {
        if (removeFav) deleteFavorites({ idUser: isUserId.id, idGoods: id }); setRemoveFav(false);
        if (addBas) addBasket({ idUser: isUserId.id, idGoods: id, count: 1 }); setAddBas(false)
    }, [removeFav, addBas])

    return (
        <div className='favorites-item-container'>
            <div className="favorites-item-content">
                <div onClick={() => { setRemoveFav(true) }} className="favorites-item-close"><img src={deletee} alt="" /></div>
                <div className="favorites-item-image">
                    <Link to={`/products/${category}/${id}`}><img src={`https://songbird21.ru/${image}`} alt="" /></Link>
                </div>
                <Link to={`/products/${category}/${id}`}>
                    <div className="favorites-item-name">{name}</div>
                </Link>
                <div className="favorites-item-price">{`${price} ₽`}</div>
                <div onClick={() => { setAddBas(true) }} className="favorites-item-add-basket"><img src={addCart} alt="" />Добавить в корзину</div>
            </div>
        </div>
    )
}

export default FavoritesItem