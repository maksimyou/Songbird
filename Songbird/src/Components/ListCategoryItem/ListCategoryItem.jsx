import React, { useEffect, useState } from 'react'
import './ListCategoryItem.scss'

function ListCategoryItem({ setCategoryShow, setCategoryId, deleteCategoryApi, id, iid, name, route, image }) {

    //const [edit, setEdit] = useState();
    const [deletee, setDelete] = useState();

    //const createFormData = () => {
    //    const formData = new FormData();
    //    formData.append('name', namme)
    //    formData.append('route', routte)
    //    formData.append('id', id)
    //    console.log(formData)
    //    return formData
    //}

    useEffect(() => {
        if (deletee) deleteCategoryApi({ id }); setDelete(false)
    }, [deletee])

    return (
        <div className="list-category-item">
            <div className="list-category-item-id">Id: {id}</div>
            <div className="list-category-item-img"><img src={`https://songbird21.ru/img/${image}`} alt="" /></div>

            <div className="list-category-item-name">{name}</div>
            <div className="list-category-item-role">{route}</div>
            <div className="list-category-item-cansek-edit">
                <div onClick={() => {
                    setCategoryId(iid)
                    setCategoryShow(true)
                }} className="list-category-item-edit">Редактировать</div>
            </div>
            <div onClick={() => { setDelete(true) }} className="list-category-item-delete">Удалить</div>
        </div>
    )
}

export default ListCategoryItem