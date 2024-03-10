import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BasketofGoodsItem.scss'
import deletee from '../../assets/delete-white.png'
import { UserContextFunc } from '../../Context/UserContext'
import resize from '../../Hooks/resize'


function BasketofGoodsItem({ isBasket, category, setGoodsBasketDep, id, image, name, price, list, quantity }) {
    const [removeBas, setRemoveBas] = useState(false)
    const [quantityGoods, setQuantityGoods] = useState(1)
    //const [weight, setWeight] = useState(1)


    const { deleteBasket, isUserId, } = UserContextFunc()
    const [width, hight] = resize();

    const setWeightGoods = () => {
        console.log(list)
        let arr2 = list.filter(e => (e.idGoods).toString() === (id).toString())
        console.log(arr2);
        setQuantityGoods(arr2[0].count)
    }

    useEffect(() => {
        setWeightGoods();
    }, [])

    useEffect(() => {
        if (removeBas) deleteBasket({ idUser: isUserId.id, idGoods: id }); setWeightGoods(); setRemoveBas(false);
    }, [removeBas])

    return (
        <div className='basketof-goods-item-container'>
            <div className="basketof-goods-item-content">
                <div className="basketof-goods-item-image">
                    <Link to={`/products/${category}/${id}`}><img src={`https://89.104.66.35:5000/${image}`} alt="" /></Link>
                </div>
                <Link to={`/products/${category}/${id}`}>
                    <div className="basketof-goods-item-name">{name}</div>
                </Link>
                <div className="basketof-goods-item-price">{width <= 930 ? `Цена: ${price * quantityGoods} ₽` : `${price * quantityGoods} ₽`}</div>


                {quantity ?

                    <div className="basketof-goods-item-weight">
                        {width <= 930 ? `Количество: ` : ``}
                        <div className="basketof-goods-item-quantity-wrap">
                            <span onClick={() => { if (quantityGoods > 1) setQuantityGoods(quantityGoods - 1) }} className={quantityGoods === 1 ? 'basketof-goods-item-quantity-minus basketof-goods-item-quantity-minus-disabled' : 'basketof-goods-item-quantity-minus'}></span>
                            <span className='basketof-goods-item-quantity_number'>{quantityGoods}</span>
                            <span onClick={() => setQuantityGoods(quantityGoods + 1)} className='basketof-goods-item-quantity-plus'>+</span>
                        </div>
                        шт.
                    </div>
                    :
                    <div className="basketof-goods-item-weight">
                        {width <= 930 ? `Вес: ` : ``}
                        <div className="basketof-goods-item-quantity-wrap">
                            <span onClick={() => { if (quantityGoods > 1) setQuantityGoods(quantityGoods - 1) }} className={quantityGoods === 1 ? 'basketof-goods-item-quantity-minus basketof-goods-item-quantity-minus-disabled' : 'basketof-goods-item-quantity-minus'}></span>
                            <span className='basketof-goods-item-quantity_number'>{quantityGoods}</span>
                            <span onClick={() => setQuantityGoods(quantityGoods + 1)} className='basketof-goods-item-quantity-plus'>+</span>
                        </div>
                        кг.
                    </div>

                }
                {/*<div className="basketof-goods-item-weight">{width <= 930 ? `Вес: ${weight} кг` : `${weight} кг`}</div>*/}
                <div onClick={() => { setRemoveBas(true) }} className="basketof-goods-item-add-basket"><img src={deletee} alt="" />Удалить из корзины</div>
                {/*<div className="basketof-goods-item-add-basket"><img src={deletee} alt="" />Товар в корзине</div>*/}

            </div>
        </div>
    )
}


export default BasketofGoodsItem