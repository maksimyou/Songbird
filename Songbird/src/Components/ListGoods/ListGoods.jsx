import React, { useEffect, useState } from 'react'
import './ListGoods.scss'
import ascending from '../../assets/ascending-sort.png'
import descending from '../../assets/descending.png'

import { UserContextFunc } from '../../Context/UserContext'

import ListGoodsItem from '../ListGoodsItem/ListGoodsItem'
import ModalEditGoods from '../ModalEditGoods/ModalEditGoods'

function ListGoods() {


    const { isAuth, goods, setGoods, getCategoryGoods, setIsGoods, isGoods, isCategory, getAllGoodsApi, deleteGoodsApi } = UserContextFunc()
    const [sortIconPrice, setSortIconPrice] = useState()
    const [goodsSort, setGoodsSort] = useState()
    const [goodsSort2, setGoodsSort2] = useState()
    const [goodsId, setGoodsId] = useState()
    const [showModalEdit, setShowModalEdit] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState()


    const sortGoodsPrice = (data) => {

        if (data === 'up') {
            let res = isGoods.sort((a, b) => b.price - a.price)
            setIsGoods(res)
        } else if (data === 'down') {
            let res = isGoods.sort((a, b) => a.price - b.price)
            setIsGoods(res)
        }
    }
    useEffect(() => {
        if (isAuth) {
            getAllGoodsApi()
        }

        document.title = 'Список всех товаров | Певчий Сластник' || 'songbird21.ru'

    }, [])

    useEffect(() => {
        if (goodsSort) getCategoryGoods({ category: selectedCategory }); setGoodsSort(false);
        if (goods) getAllGoodsApi(); setGoods(false);
        if (goodsSort2) sortGoodsPrice(sortIconPrice); setGoodsSort2(false);
    }, [goods, goodsSort, goodsSort2])
    console.log(isGoods)

    return (
        <div className='list-goods-container'>
            {showModalEdit && <ModalEditGoods isCategory={isCategory} setShowModalEdit={setShowModalEdit} goodsId={goodsId} isGoods={isGoods} />}
            <div className="list-goods-content">
                {isGoods.length >= 1
                    ? <>
                        <div className="list-goods-title-refresh">
                            <div className="list-goods-title">Список всех товаров</div>
                            <select
                                value={selectedCategory}
                                onChange={e => { setSelectedCategory(e.target.value); setGoodsSort(true) }}
                                name="" id="">
                                <option value="all">Все категориии</option>
                                {isCategory.map(e => {
                                    return <option key={e.id} value={e.route}>{e.name}</option>
                                })}
                            </select>
                            <select
                                value={sortIconPrice}
                                onChange={e => { setSortIconPrice(e.target.value); setGoodsSort2(true) }}
                                name="" id="">
                                <option value="down">По возрастанию</option>
                                <option value="up">По убыванию</option>
                            </select>
                        </div>
                        <div className="list-goods-item-list">
                            <div className=""></div>
                            {
                                isGoods.map((e, idd) => {
                                    return <ListGoodsItem key={e.id} idd={idd} setShowModalEdit={setShowModalEdit} setGoodsId={setGoodsId} price={e.price} isCategory={isCategory} id={e.id} imageURL={e.imageURL[0]} name={e.name} category={e.category} deleteGoodsApi={deleteGoodsApi} />
                                })
                            }
                        </div>
                    </>
                    :
                    <div className="list-goods-empty">У вас нет товаров</div>}
            </div>
        </div >
    )
}

export default ListGoods