import React, { useState, useEffect, memo } from 'react'
import './Favorites.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import FavoritesItem from '../../Components/FavoritesItem/FavoritesItem'
import { UserContextFunc } from '../../Context/UserContext'



function Favorites() {

    const { isAuth, GoodsFavoriteDep, setGoodsFavoriteDep, isFavorites, getCategoryGoods, setIsGoods, isGoods, isCategory, getAllGoodsApi, isUserId, deleteGoodsApi, favorites, getGoodsFavorites } = UserContextFunc()


    useEffect(() => {
        getGoodsFavorites()
    }, [])
    useEffect(() => {
        getGoodsFavorites(); setGoodsFavoriteDep(false)
    }, [GoodsFavoriteDep])
    return (
        isAuth ?
            <div className='favorites-container'>
                <div className="favorites-content">
                    <BreadCrumbs textLink={['Избранное']} location={location} />
                    {favorites.length > 0 ?
                        <><div className="favorites-content-title">Избранное</div>
                            <div className="favorites-content-list">
                                <div className="favorites-content-list-header">
                                    <div className="list-header-close-img"></div>
                                    <div className="list-header-name">Товар</div>
                                    <div className="list-header-price">Цена</div>

                                </div>
                                {favorites.map(e => <FavoritesItem key={e.id} id={e.id} image={e.imageURL[0]} name={e.name} price={e.price} category={e.category} />)}
                            </div> </> : <div className="favorites-empty-list">Ваш список избранного на данный момент пуст.</div>}

                </div>
            </div>
            :
            <div className="favorites-empty">У вас нет доступа</div>
    )
}

export default memo(Favorites)