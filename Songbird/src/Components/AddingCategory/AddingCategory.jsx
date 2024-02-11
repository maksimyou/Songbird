import React, { useEffect, useState } from 'react'
import './AddingCategory.scss'
import { UserContextFunc } from '../../Context/UserContext'

function AddingCategory() {
    const [name, setName] = useState();
    const [routing, setRouting] = useState();
    const [category, setCategory] = useState();

    const { addCategoryApi } = UserContextFunc()

    const createFormData = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('route', routing)
        console.log(formData)
        return formData
    }
    useEffect(() => {
        if (category) addCategoryApi(createFormData()); setCategory(false)
    }, [category])

    return (
        <div className='adding-category-container'>
            <div className="adding-category-content">
                <div className="adding-category-input">
                    <span className='adding-category-input-title'>Имя: </span>
                    <input onBlur={(e) => { setName(e.target.value) }} placeholder='Введите имя' type="text" />
                </div>
                <div className="adding-category-input">
                    <span className='adding-category-input-title'>Роутинг: </span>
                    <input onBlur={(e) => { setRouting(e.target.value) }} placeholder='Введите роутинг' type="text" />
                </div>
                <button onClick={() => { setCategory(true) }} className='adding-category-add-btn'>Добавить</button>
            </div>
        </div>
    )
}

export default AddingCategory