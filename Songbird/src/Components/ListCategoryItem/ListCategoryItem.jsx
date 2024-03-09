import React, { useEffect, useState } from 'react'
import './ListCategoryItem.scss'

function ListCategoryItem({ deleteCategoryApi, editCategoryApi, id, name, route }) {

    const [mode, setMode] = useState(false);
    const [namme, setName] = useState(name);
    const [routte, setRoute] = useState(route);
    const [edit, setEdit] = useState();
    const [deletee, setDelete] = useState();

    const createFormData = () => {
        const formData = new FormData();
        formData.append('name', namme)
        formData.append('route', routte)
        formData.append('id', id)
        console.log(formData)
        return formData
    }

    useEffect(() => {
        if (deletee) deleteCategoryApi({ id }); setDelete(false)
        if (edit) editCategoryApi(createFormData()); setEdit(false)
    }, [edit, deletee])

    return (
        <div className="list-category-item">
            <div className="list-category-item-id">Id: {id}</div>
            <div className="list-category-item-name">{mode ? <input onChange={(e) => { setName(e.target.value) }} className='list-category-name-input' value={namme} type="text" /> : name}</div>
            <div className="list-category-item-role">{mode ? <input onChange={(e) => { setRoute(e.target.value) }} className='list-category-route-input' value={routte} type="text" /> : route}</div>
            <div className="list-category-item-cansek-edit">
                <div onClick={() => {
                    if (mode) { setEdit(true) }
                    setMode(!mode)
                }} className="list-category-item-edit">{mode ? 'Сохранить' : 'Редактировать'}</div>
                {mode && <div onClick={() => { setMode(false) }} className="list-category-item-cancel">Отмена</div>}
            </div>

            <div onClick={() => { setDelete(true) }} className="list-category-item-delete">Удалить</div>
        </div>
    )
}

export default ListCategoryItem