import React, { useState } from 'react'
import './ProductionMoreInfo.scss'
import DropDownList from '../DropDownList/DropDownList'
import { UserContextFunc } from '../../Context/UserContext'
function ProductionMoreInfo() {
    const { isGoodsOne } = UserContextFunc();


    return (
        <div className="production-more-info-container">
            <div className="production-more-info-content">
                <div className="production-more-info-content-left">
                    <img src={`http://89.104.66.35:5000/${isGoodsOne.imageURL}`} alt="" />
                </div>
                <div className="production-more-info-content-right">
                    <div className="more-info-content-right-title">{isGoodsOne.name}</div>
                    <div className="more-info-content-right-bought-reviews"><div className="more-info-content-right-bought">{`Купили ${isGoodsOne.bought} раз`}</div> <div className="more-content-right-reviews">{`${isGoodsOne.liked} отзывов`}</div> </div>
                    <div className="more-info-content-right-price">{`${isGoodsOne.price} ₽`}</div>
                    <div className="more-info-content-right-selects">
                        <select name="" id="" >
                            <option value="">1кг</option>
                            <option value="">2кг</option>
                            <option value="">3кг</option>
                            <option value="">4кг</option>
                        </select>
                        <select name="" id="" >
                            <option value="">Йогуртовый</option>
                            <option value="">Фруктовый</option>
                            <option value="">Ореховый</option>
                            <option value="">Бисквитный</option>
                        </select>
                    </div>
                    <div className="more-info-content-right-buy-in-the-basket">
                        <button className="more-info-content-right-buy">Купить сейчас</button> <button className="more-content-right-basket">В корзину</button>
                    </div>
                    <div className="more-info-content-right-return-money">ВЕРНЕМ ДЕНЬГИ, если Вам не понравился вкус или качество продукта, без чека.</div>

                    <DropDownList title={"Описание"} text={'Мы готовим из слоеного теста с ванильно-сливочным заварным кремом'} />
                    <DropDownList title={"Состав"} text={'Мы готовим из слоеного теста с ванильно-сливочным заварным кремом'} />
                    <DropDownList title={"Срок годности"} text={'Мы готовим из слоеного теста с ванильно-сливочным заварным кремом'} />
                    <DropDownList title={"Доставка"} text={'Мы готовим из слоеного теста с ванильно-сливочным заварным кремом'} />
                    <DropDownList title={"Оплата"} text={'Мы готовим из слоеного теста с ванильно-сливочным заварным кремом'} />
                </div>
            </div>
        </div>
    )
}

export default ProductionMoreInfo