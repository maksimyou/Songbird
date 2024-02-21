import React, { useState, useEffect } from 'react'
import './AddingGoods.scss'
import { UserContextFunc } from '../../Context/UserContext'

function AddingGoods() {

    const { addGoodsApi, isCategory } = UserContextFunc()
    const [goods, setGoods] = useState()
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [messageImg, setMessageImg] = useState(false);
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [composition, setComposition] = useState('');

    const [category, setCategory] = useState()

    const createFormData = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('composition', composition)
        formData.append('description', description)
        formData.append('files', file)
        console.log(formData)
        return formData
    }


    const CheckingImage = (file) => {
        const imageFormat = file.type.split('/').slice(-1)[0].toLowerCase();
        console.log(imageFormat, (file.size / 1024) / 1024);
        if ((file.size / 1024) / 1024 > 50) { setMessageImg(true); return }
        switch (imageFormat) {
            case 'jpeg': setImage(URL.createObjectURL(file));
                break
            case 'png': setImage(URL.createObjectURL(file));
                break
            case 'gif': setImage(URL.createObjectURL(file));
                break
            case 'webp': setImage(URL.createObjectURL(file));
                break
            default: setMessageImg(true); return
        }
        setMessageImg(false)
    }



    useEffect(() => {
        if (goods) {
            if (!messageImg) addGoodsApi(createFormData()); setGoods(false);
        }
    }, [goods])

    return (
        <div className='adding-goods-container'>
            <div className="adding-goods-content">
                <div className="adding-goods-left">
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Имя: </span>
                        <input onBlur={(e) => { setName(e.target.value) }} placeholder='Введите имя' type="text" />
                    </div>
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Цена: </span>
                        <input onBlur={(e) => { setPrice(e.target.value) }} placeholder='Введите цену' type="text" />
                    </div>
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Описание: </span>
                        <textarea onBlur={(e) => { setDescription(e.target.value) }} placeholder='Введите описание' type="text" />
                    </div>
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Состав: </span>
                        <textarea onBlur={(e) => { setComposition(e.target.value) }} placeholder='Введите состав' type="text" />
                    </div>

                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Категория: </span>
                        <select onChange={(e) => { setCategory(e.target.value) }}>
                            {isCategory.map(e => {
                                return <>
                                    <option value={e.route}>{e.name}</option>
                                </>
                            })}
                        </select>
                    </div>
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Изображение:</span>
                        <label htmlFor="input__file" className="input__file-button"><span className='label-img'></span>Выберите файл</label>
                        <input onChange={(e) => { CheckingImage(e.target.files[0]); setFile(e.target.files[0]) }} id='input__file' type="file" name="" />
                    </div>
                    <button onClick={() => { if (!messageImg) setGoods(true) }} className='adding-goods-add-btn'>Добавить</button>
                </div>

                <div className="adding-goods-right">
                    <img style={messageImg ? { border: "solid 1px red" } : {}} className='adding-goods-img-prevention' src={image} alt="" />
                    <div className="adding-goods-img-message">{messageImg ? 'Файл не соответствует формату изображения (jpeg, png, gif, webp) или размер файла превышает 50мб.' : ''}</div>
                </div>
            </div>
        </div>
    )
}

export default AddingGoods

