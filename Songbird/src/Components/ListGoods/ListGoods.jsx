import React, { useEffect, useState } from 'react'
import './ListGoods.scss'
import products from '../../Data/product-name.js'
import { UserContextFunc } from '../../Context/UserContext'

function ListGoods() {
    const { isGoods, getAllGoodsApi } = UserContextFunc()
    const [goods, setGoods] = useState()


    useEffect(() => {
        if (goods) getAllGoodsApi(); setGoods(false);
    }, [goods])
    console.log(isGoods, products)
    return (
        <div className='list-goods-container'>
            <div className="list-goods-content">
                <div className="list-goods-title-refresh">
                    <div className="list-goods-title">Список всех товаров</div><div onClick={() => { setGoods(true) }} className="list-goods-refresh">Обновить</div>
                </div>
                <div className="list-goods-item-list">
                    {
                        isGoods.map(e => {
                            return <> <div className="list-goods-item">
                                <div className="list-goods-item-id">Id: {e.id}</div>
                                <div className="list-goods-item-img">
                                    <img src={`http://localhost:5000/${e.imageURL}`} alt="" />
                                </div>
                                <div className="list-goods-item-name">{e.name}</div>
                                <div className="list-goods-item-category">{products.products[e.category]}</div>
                                <div className="list-goods-item-edit">Редактировать</div>
                                <div className="list-goods-item-delete">Удалить</div>
                            </div></>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ListGoods