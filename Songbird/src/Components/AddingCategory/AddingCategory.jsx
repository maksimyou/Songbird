import React, { useEffect, useState } from 'react'
import './AddingCategory.scss'
import { UserContextFunc } from '../../Context/UserContext'

function AddingCategory() {
    const [name, setName] = useState('');
    const [valName, setValName] = useState(true);
    const [category, setCategory] = useState();

    const { addCategoryApi } = UserContextFunc()

    const createFormData = () => {
        const formData = new FormData();
        formData.append('name', name)
        console.log(formData)
        return formData
    }

    useEffect(() => {
        if (category) addCategoryApi(createFormData()); setCategory(false)
    }, [category])

    const validationName = (str) => {
        let res = str.replace(/[а-яА-Я]/g, '')
        if (res.length === 0) {
            setValName(true)
        } else {
            setValName(false)
        }
    }

    useEffect(() => {
        document.title = 'Добавление категорий| Певчий Сластник' || 'songbird21.ru'
    }, [])
    return (
        <div className='adding-category-container'>
            <div className="adding-category-content">
                <div className="adding-category-input">
                    <span className='adding-category-input-title'>Имя: </span>
                    <input className={valName ? '' : 'adding-category-active'} onBlur={(e) => { setName(e.target.value); validationName(e.target.value) }} placeholder='Введите имя' type="text" />
                </div>
                {valName ? '' : <div className='error-adding-category-message'>Введите буквы русского алфавита без пробелов </div>}

                <button onClick={() => { if (valName && name.length > 0) setCategory(true) }} className='adding-category-add-btn'>Добавить</button>
            </div>
        </div>
    )
}

export default AddingCategory