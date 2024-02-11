import React, { useState, useEffect } from 'react'
import './/AddingGoods.scss'
import { UserContextFunc } from '../../Context/UserContext'

function AddingGoods() {
    //{
    //    name: '',
    //    price: '',
    //    category: '',
    //}
    const { addGoodsApi } = UserContextFunc()
    const [goods, setGoods] = useState()
    const [file, setFile] = useState();
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [category, setCategory] = useState()

    const createFormData = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('files', file)
        console.log(formData)
        return formData
    }
    useEffect(() => {
        if (goods) { addGoodsApi(createFormData()); setGoods(false) }
    }, [goods])

    //setUserData({ ...userData, password: str })
    return (
        <div className='adding-goods-container'>
            <div className="adding-goods-content">
                <div className="adding-goods-input">
                    <span className='adding-goods-input-title'>Имя: </span>
                    <input onBlur={(e) => { setName(e.target.value) }} placeholder='Введите имя' type="text" />
                </div>
                <div className="adding-goods-input">
                    <span className='adding-goods-input-title'>Цена: </span>
                    <input onBlur={(e) => { setPrice(e.target.value) }} placeholder='Введите цену' type="text" />
                </div>
                <div className="adding-goods-input">
                    <span className='adding-goods-input-title'>Категория: </span>
                    <select onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="cakes">Торты</option>
                        <option value="dessert">Десерты</option>
                        <option value="capture">Капкейки</option>
                        <option value="biscuit">Печенье</option>
                    </select>
                </div>
                <div className="adding-goods-input">
                    <span className='adding-goods-input-title'>Изображение:</span>
                    <label htmlFor="input__file" className="input__file-button"><span className='label-img'></span>Выберите файл</label>
                    <input onChange={(e) => { setFile(e.target.files[0]) }} id='input__file' type="file" name="" />
                </div>
                <button onClick={() => { setGoods(true) }} className='adding-goods-add-btn'>Добавить</button>
            </div>
        </div>
    )
}

export default AddingGoods

