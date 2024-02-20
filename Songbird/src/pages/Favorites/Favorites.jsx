import React, { useState, useEffect } from 'react'
import './Favorites.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import FavoritesItem from '../../Components/FavoritesItem/FavoritesItem'
import { UserContextFunc } from '../../Context/UserContext'



function Favorites() {
    const [GoodsFavoriteDep, setGoodsFavoriteDep] = useState(false)
    const { isFavorites, getCategoryGoods, setIsGoods, isGoods, isCategory, getAllGoodsApi, isUserId, deleteGoodsApi, favorites, getGoodsFavorites } = UserContextFunc()




    useEffect(() => {
        getGoodsFavorites()
    }, [])
    useEffect(() => {
        getGoodsFavorites(); setGoodsFavoriteDep(false)
    }, [GoodsFavoriteDep])
    return (
        <div className='favorites-container'>
            <div className="favorites-content">
                <BreadCrumbs textLink={['Избранное']} location={location} />
                {favorites.length > 0 ?
                    <><div className="favorites-content-title">Избранное</div>
                        <div className="favorites-content-list">
                            <div className="favorites-content-list-header">
                                <div className="list-header-close-img"></div>
                                <div className="list-header-name">Название</div>
                                <div className="list-header-price">Цена</div>

                            </div>
                            {favorites.map(e => <FavoritesItem key={e.id} setGoodsFavoriteDep={setGoodsFavoriteDep} id={e.id} image={e.imageURL} name={e.name} price={e.price} />)}
                        </div> </> : <div className="favorites-empty-list">Ваш список избранного на данный момент пуст.</div>}

            </div>
        </div>
    )
}

export default Favorites