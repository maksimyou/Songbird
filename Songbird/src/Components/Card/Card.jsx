import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'
import like from '../../assets/like.svg'
//import imgCard from '../../assets/img-card.png'

import likeColor from '../../assets/like-color.svg'
import { UserContextFunc } from '../../Context/UserContext'

function Card({ image, name, price, bought, liked, nav, id, quantity }) {

    const { isAuth, addFavorites, isUserId, deleteFavorites, isFavorites, setIsSwitchCategory, checkLike, setCheckLike, checkBasket, setCheckBasket, isBasket, addBasket, deleteBasket } = UserContextFunc()
    //const [weight, setWeight] = useState('Выберите вес')
    //const [showList, setShowList] = useState(false)
    const [selectedCard, setSelectedCard] = useState('1')

    const [likee, setLike] = useState(true)
    const [likeShow, setlikeShow] = useState(false)
    const [basketShow, setbasketShow] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [addFav, setAddFav] = useState(false)
    const [removeFav, setRemoveFav] = useState(false)

    const [addBaskets, setAddBasket] = useState(false)
    const [removeBasket, setRemoveBasket] = useState(false)
    const [quantityGoods, setQuantityGoods] = useState(1)
    const checkLikeGoods = () => {

        let arr = JSON.parse(isFavorites.lists);
        console.log(arr);
        if (arr.includes(id)) {
            setlikeShow(true)
        } else {
            setlikeShow(false)
        }
    }


    const checkBasketGoods = () => {

        let arr = JSON.parse(isBasket.lists);
        console.log(arr);

        let arr2 = arr.map(e => e.idGoods)
        console.log(arr2);

        if (arr2.includes(id)) {
            setbasketShow(true)
        } else {
            setbasketShow(false)
        }
    }



    useEffect(() => {
        checkLikeGoods()
        checkBasketGoods()
    }, [])

    useEffect(() => {
        if (checkLike) checkLikeGoods(); setCheckLike(false)
        if (checkBasket) checkBasketGoods(); setCheckBasket(false)
        if (addFav) addFavorites({ idGoods: id }); setIsSwitchCategory(true); setAddFav(false);
        if (removeFav) deleteFavorites({ idGoods: id }); setIsSwitchCategory(true); setRemoveFav(false);
        if (addBaskets) {
            quantity ? addBasket({ idGoods: id, count: quantityGoods }) : addBasket({ idGoods: id, count: selectedCard })
            setAddBasket(false);
        }
        if (removeBasket) deleteBasket({ idGoods: id }); setRemoveBasket(false);
    }, [addFav, removeFav, checkLike, checkBasket, addBaskets, removeBasket])

    return (
        <div className='card-container'>
            <div className="card-content">
                <Link to={`${id}`}><div onMouseEnter={() => setShowImg(true)} onMouseLeave={() => setShowImg(false)} className="card-img">{showImg && <div className="card-img-eye"></div>}<img className={showImg && 'card-img-hover'} src={`http://89.104.66.35:5000/${image}`} alt="" /></div></Link>
                <div className="card-name">{name}</div>
                <div className="number-of-purchases-and-liked">
                    <div className="number-of-purchases">{`Купили ${bought} раз`}</div>
                    <div className="number-of-liked">({liked})<img src={likeColor} alt="" /> </div>
                </div>
                <div className="card-price">{`${price} ₽`}<span>1 кг.</span></div>
                {quantity ?
                    <div className="card-quantity">Количество:
                        <div className="card-quantity-wrap">
                            <span onClick={() => { if (quantityGoods > 1) setQuantityGoods(quantityGoods - 1) }} className={quantityGoods === 1 ? 'card-quantity-minus card-quantity-minus-disabled' : 'card-quantity-minus'}></span>
                            <span className='card-quantity_number'>{quantityGoods}</span>
                            <span onClick={() => setQuantityGoods(quantityGoods + 1)} className='card-quantity-plus'>+</span>
                        </div>
                        штук.</div>
                    :
                    <select
                        className='card-selects'
                        value={selectedCard}
                        onChange={e => setSelectedCard(e.target.value)}
                    >
                        <option value="1">1кг</option>
                        <option value="2">2кг</option>
                        <option value="3">3кг</option>
                        <option value="4">4кг</option>
                    </select>
                    //<div onClick={(e) => { setShowList(true); e.stopPropagation() }} className="card-choos-weight">
                    //    <div className="card-choos-top">{weight}<img src="" alt="" /></div>
                    //    {showList ? <ul>
                    //        <li onClick={(e) => { setShowList(false); setWeight('1кг.'); e.stopPropagation() }}>1кг.</li>
                    //        <li onClick={(e) => { setShowList(false); setWeight('2кг.'); e.stopPropagation() }}>2кг.</li>
                    //        <li onClick={(e) => { setShowList(false); setWeight('3кг.'); e.stopPropagation() }}>3кг.</li>
                    //        <li onClick={(e) => { setShowList(false); setWeight('4кг.'); e.stopPropagation() }}>4кг.</li>
                    //    </ul> : ''}
                    //</div>
                }
                <div className="add-to-cart-and-like">
                    {isAuth ? <div onClick={() => { if (basketShow) { setRemoveBasket(true) } else { setAddBasket(true) } }} className="">
                        {basketShow ?
                            <button onClick={e => e.preventDefault()} className='add-to-cart-in'>Удалить</button>
                            :
                            <button onClick={e => e.preventDefault()} className='add-to-cart'>В корзину</button>}
                    </div> :
                        <button onClick={e => e.preventDefault()} className='add-to-cart'>В корзину</button>
                    }
                    {isAuth ? <div onClick={() => { if (likeShow) { setRemoveFav(true) } else { setAddFav(true) } }} onMouseEnter={() => setLike(false)} onMouseLeave={() => setLike(true)} className="">{
                        likeShow ?
                            <img className='card-like' src={likeColor} alt="" />
                            : likee ?
                                <img className='card-like' src={like} alt="" />
                                :
                                <img className='card-like' src={likeColor} alt="" />}
                    </div>
                        :
                        <div onMouseEnter={() => setLike(false)} onMouseLeave={() => setLike(true)} className="">
                            {likee ?
                                <img className='card-like' src={like} alt="" />
                                :
                                <img className='card-like' src={likeColor} alt="" />}
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default memo(Card);