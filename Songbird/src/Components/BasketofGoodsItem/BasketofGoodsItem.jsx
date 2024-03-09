import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BasketofGoodsItem.scss'
import deletee from '../../assets/delete-white.png'
import { UserContextFunc } from '../../Context/UserContext'
import resize from '../../Hooks/resize'


function BasketofGoodsItem({ category, setGoodsBasketDep, id, image, name, price, weight = '1.5' }) {

    const [removeBas, setRemoveBas] = useState(false)
    const { deleteBasket, isUserId, } = UserContextFunc()
    const [width, hight] = resize();

    useEffect(() => {
        if (removeBas) deleteBasket({ idUser: isUserId.id, idGoods: id }); setRemoveBas(false);
    }, [removeBas])

    return (
        <div className='basketof-goods-item-container'>
            <div className="basketof-goods-item-content">
                <div className="basketof-goods-item-image">
                    <Link to={`/products/${category}/${id}`}><img src={`http://89.104.66.35:5000/${image}`} alt="" /></Link>
                </div>
                <Link to={`/products/${category}/${id}`}>
                    <div className="basketof-goods-item-name">{name}</div>
                </Link>
                <div className="basketof-goods-item-price">{width <= 930 ? `Цена: ${price} ₽` : `${price} ₽`}</div>
                <div className="basketof-goods-item-weight">{width <= 930 ? `Вес: ${weight} кг` : `${weight} кг`}</div>
                <div onClick={() => { setRemoveBas(true) }} className="basketof-goods-item-add-basket"><img src={deletee} alt="" />Удалить из корзины</div>
            </div>
        </div>
    )
}


export default BasketofGoodsItem