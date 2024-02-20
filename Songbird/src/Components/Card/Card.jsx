import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'
import like from '../../assets/like.svg'
//import imgCard from '../../assets/img-card.png'

import likeColor from '../../assets/like-color.svg'
import { UserContextFunc } from '../../Context/UserContext'

function Card({ image, name, price, bought, liked, nav, id }) {

    const { addFavorites, isUserId, deleteFavorites, isFavorites, setIsSwitchCategory, checkLike, setCheckLike } = UserContextFunc()
    const [weight, setWeight] = useState('Выберите вес')
    const [showList, setShowList] = useState(false)
    const [likee, setLike] = useState(true)
    const [likeShow, setlikeShow] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [addFav, setAddFav] = useState(false)
    const [removeFav, setRemoveFav] = useState(false)

    const checkLikeGoods = () => {

        let arr = JSON.parse(isFavorites.lists);
        console.log(arr)
        if (arr.includes(id)) {
            setlikeShow(true)
        } else {
            setlikeShow(false)
        }
    }



    useEffect(() => {
        checkLikeGoods()
    }, [])

    useEffect(() => {
        if (checkLike) checkLikeGoods(); setCheckLike(false)
        if (addFav) addFavorites({ idGoods: id }); setIsSwitchCategory(true); setAddFav(false);
        if (removeFav) deleteFavorites({ idGoods: id }); setIsSwitchCategory(true); setRemoveFav(false);
    }, [addFav, removeFav, checkLike])

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
                <div onClick={() => { setShowList(true) }} className="card-choos-weight">
                    <div className="card-choos-top">{weight}<img src="" alt="" /></div>
                    {showList ? <ul>
                        <li onClick={(e) => { setShowList(false); setWeight('1кг.'); e.stopPropagation() }}>1кг.</li>
                        <li onClick={(e) => { setShowList(false); setWeight('2кг.'); e.stopPropagation() }}>2кг.</li>
                        <li onClick={(e) => { setShowList(false); setWeight('3кг.'); e.stopPropagation() }}>3кг.</li>
                        <li onClick={(e) => { setShowList(false); setWeight('4кг.'); e.stopPropagation() }}>4кг.</li>
                    </ul> : ''}
                </div>
                <div className="add-to-cart-and-like">
                    <button className='add-to-cart'>В корзину</button>
                    <div onClick={() => { if (likeShow) { setRemoveFav(true) } else { setAddFav(true) } }} onMouseEnter={() => setLike(false)} onMouseLeave={() => setLike(true)} className="">{
                        likeShow ?
                            <img className='card-like' src={likeColor} alt="" />
                            : likee ?
                                <img className='card-like' src={like} alt="" />
                                :
                                <img className='card-like' src={likeColor} alt="" />}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Card