import React, { useEffect, useState } from 'react'
import './ProductionMoreInfo.scss'
import DropDownList from '../DropDownList/DropDownList'
import { UserContextFunc } from '../../Context/UserContext'
import MoadlImage from '../MoadlImage/MoadlImage'
function ProductionMoreInfo() {

    const { isGoodsOne, isAuth, addBasket, deleteBasket, currentImg, setCurrentImg } = UserContextFunc();
    const [addBaskets, setAddBasket] = useState(false)
    const [removeBasket, setRemoveBasket] = useState(false)
    const [showModalImg, setShowModalImg] = useState(false)

    const [quantityGoods, setQuantityGoods] = useState(1)
    const [selectedCard, setSelectedCard] = useState('1')
    const [countImg, setCountImg] = useState(0)

    //useEffect(() => {
    //    setCurrentImg(isGoodsOne.imageURL[0])
    //}, [])
    console.log(isGoodsOne)
    useEffect(() => {
        if (addBaskets) {
            isGoodsOne.quantity ? addBasket({ idGoods: isGoodsOne.id, count: quantityGoods }) : addBasket({ idGoods: isGoodsOne.id, count: selectedCard })
            setAddBasket(false);
        }

        if (removeBasket) deleteBasket({ idGoods: isGoodsOne.id }); setRemoveBasket(false);
    }, [addBaskets, removeBasket])

    return (
        <div className="production-more-info-container">
            <div className="production-more-info-content">
                {showModalImg ? isGoodsOne.imageURL ? <MoadlImage setShowModalImg={setShowModalImg} countImg={countImg} setCountImg={setCountImg} /> : '' : ''}
                <div className="production-more-info-content-left">
                    <img onClick={() => { setShowModalImg(true) }} src={`https://songbird21.ru/${!currentImg ? '' : currentImg}`} alt="" />
                    <div className="production-more-info-list-img">
                        {!isGoodsOne.imageURL ? '' : isGoodsOne.imageURL.map((elem, i) => {
                            return <div onMouseEnter={(e) => { console.log(e.target); setCurrentImg(elem) }} key={i} className={currentImg === elem ? 'production-more-info-img-min production-more-info-img-min-active' : 'production-more-info-img-min'}>
                                <img src={`https://songbird21.ru/${elem}`} alt="" />
                            </div>
                        })}
                    </div>
                </div>
                <div className="production-more-info-content-right">
                    <div className="more-info-content-right-title">{isGoodsOne.name}</div>
                    <div className="more-info-content-right-bought-reviews">
                        <div className="more-info-content-right-bought">{`Купили ${isGoodsOne.bought} раз`}</div>
                        <div className="more-content-right-reviews">{`${isGoodsOne.liked} отзывов`}</div>
                    </div>
                    <div className="more-info-content-right-price">{!isGoodsOne.price ? 0 : `${isGoodsOne.price} ₽`}</div>
                    <div className="more-info-content-right-selects">
                        {isGoodsOne.quantity
                            ?
                            <div className="more-info-quantity">Количество:
                                <div className="more-info-quantity-wrap">
                                    <span onClick={() => { if (quantityGoods > 1) setQuantityGoods(quantityGoods - 1) }} className={quantityGoods === 1 ? 'more-info-quantity-minus more-info-quantity-minus-disabled' : 'more-info-quantity-minus'}></span>
                                    <span className='more-info-quantity_number'>{quantityGoods}</span>
                                    <span onClick={() => setQuantityGoods(quantityGoods + 1)} className='more-info-quantity-plus'>+</span>
                                </div>
                                штук.</div>
                            :
                            <select
                                value={selectedCard}
                                onChange={e => setSelectedCard(e.target.value)} name="" id="" >
                                <option value="1">1кг</option>
                                <option value="2">2кг</option>
                                <option value="3">3кг</option>
                                <option value="4">4кг</option>
                            </select>
                        }
                        {/*<select name="" id="" >
                            <option value="">Йогуртовый</option>
                            <option value="">Фруктовый</option>
                            <option value="">Ореховый</option>
                            <option value="">Бисквитный</option>
                        </select>*/}
                    </div>
                    <div className="more-info-content-right-buy-in-the-basket">
                        <button className="more-info-content-right-buy">Купить сейчас</button>
                        {isAuth ? isGoodsOne.inBasket
                            ?
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (isGoodsOne.inBasket) {
                                    setRemoveBasket(true)
                                } else {
                                    setAddBasket(true)
                                }
                            }} className="more-content-right-basket">Удалить</button>
                            :
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (isGoodsOne.inBasket) {
                                    setRemoveBasket(true)
                                } else {
                                    setAddBasket(true)
                                }
                            }} className="more-content-right-basket">В корзину</button>
                            :
                            <button className="more-content-right-basket">В корзину</button>
                        }
                    </div>
                    <div className="more-info-content-right-return-money">ВЕРНЕМ ДЕНЬГИ, если Вам не понравился вкус или качество продукта, без чека.</div>

                    <DropDownList title={"Описание"} text={isGoodsOne.description} />
                    <DropDownList title={"Состав"} text={isGoodsOne.composition} />
                    <DropDownList title={"Срок годности"} text={'Срок годности: 3 дня Условия хранения: хранить при температуре от 3 до 5 °C '} />
                    <DropDownList title={"Доставка"} text={'Мы готовим из слоеного теста с ванильно-сливочным заварным кремом'} />
                    <DropDownList title={"Оплата"} text={'Мы готовим из слоеного теста с ванильно-сливочным заварным кремом'} />
                </div>
            </div>
        </div>
    )
}

export default ProductionMoreInfo