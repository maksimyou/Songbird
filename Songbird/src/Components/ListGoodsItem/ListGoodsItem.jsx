import React, { useEffect, useState } from 'react'
import './ListGoodsItem.scss'
function ListGoodsItem({ idd, setShowModalEdit, setGoodsId, isCategory, deleteGoodsApi, id, imageURL, name, category, price }) {
    const [goodsDelete, setGoodsDelete] = useState()


    const filterCategory = () => {
        return isCategory.filter(e => e.route === category)[0].name
    }

    useEffect(() => {
        if (goodsDelete) deleteGoodsApi({ id }); setGoodsDelete(false)
    }, [goodsDelete])

    return (
        <div className="list-goods-item">
            <div className="list-goods-item-id">Id: {id}</div>
            <div className="list-goods-item-img">
                <img src={`https://songbird21.ru/img/${imageURL}`} alt="" />
            </div>
            <div className="list-goods-item-name">{name}</div>
            <div className="list-goods-item-category">{filterCategory()}</div>
            <div className="list-goods-item-price">{`${price} ₽`}</div>
            <div onClick={() => { setGoodsId(idd); setShowModalEdit(true) }} className="list-goods-item-edit">Редактировать</div>
            <div onClick={() => { setGoodsDelete(true) }} className="list-goods-item-delete">Удалить</div>
        </div>
    )
}

export default ListGoodsItem