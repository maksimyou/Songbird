import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BasketOfGoods.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import BasketofGoodsItem from '../../Components/BasketofGoodsItem/BasketofGoodsItem'
import { UserContextFunc } from '../../Context/UserContext'

function BasketOfGoods() {

    const { getGoodsBasket, basket, sumBaske, GoodsBasketDep, setGoodsBasketDep } = UserContextFunc()

    console.log(basket);


    useEffect(() => {
        getGoodsBasket();
    }, [])

    useEffect(() => {
        if (GoodsBasketDep) getGoodsBasket(); setGoodsBasketDep(false)
    }, [GoodsBasketDep])

    return (
        <div className='basket-of-goods-container'>
            <div className="basket-of-goods-content">
                <BreadCrumbs textLink={['Корзина']} location={location} />
                {basket.goods.length > 0 ?
                    <><div className="basket-of-goods-title-total-order">
                        <div className="basket-of-goods-title">Корзина</div>
                        <div className="basket-of-goods-total-order">
                            <div className="basket-of-goods-total">Итого: <span>{`${sumBaske} ₽`}</span></div>
                            <Link to={'/checkout'}>
                                <div className="basket-of-goods-order">Оформить заказ</div>
                            </Link>
                        </div>
                    </div>
                        <div className="basket-of-goods-lists">
                            <div className="basket-of-goods-list-header">
                                <div className="basket-list-header-close-img"></div>
                                <div className="basket-list-header-name">Товар</div>
                                <div className="basket-list-header-price">Цена</div>
                                <div className="basket-list-header-weight">Вес/Количество</div>
                            </div>
                            {basket.goods.map(e => <BasketofGoodsItem key={e.id} quantity={e.quantity} setGoodsBasketDep={setGoodsBasketDep} id={e.id} image={e.imageURL[0]} name={e.name} price={e.price} list={basket.list} category={e.category} />)}
                        </div>
                    </>
                    :
                    <div className="basket-of-goods">Ваша корзина на данный момент пуста.</div>}
            </div>
        </div>
    )
}

export default BasketOfGoods
