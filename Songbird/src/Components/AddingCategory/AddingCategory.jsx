import React, { useEffect, useState } from 'react'
import './AddingCategory.scss'
import { UserContextFunc } from '../../Context/UserContext'

function AddingCategory() {
    const [name, setName] = useState('');
    const [valName, setValName] = useState(true);
    const [category, setCategory] = useState();
    const [file, setFile] = useState([]);
    const [image, setImage] = useState();
    const [messageImg, setMessageImg] = useState(false);
    const [statusImg, setStatusImg] = useState({ a: null, text: '' })
    const { addCategoryApi } = UserContextFunc()

    const createFormData = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('files', file)
        console.log(formData)
        return formData
    }


    const CheckingImage = (files, id) => {
        setImage('');
        console.log(id)
        const imageFormat = files.type.split('/').slice(-1)[0].toLowerCase();
        console.log(imageFormat, (files.size / 1024) / 1024);
        if ((files.size / 1024) / 1024 > 50) {
            setMessageImg(true);
            let obj = statusImg;
            obj.a = false;
            obj.text = files.name
            setStatusImg(obj)
            return
        }
        switch (imageFormat) {


            case 'jpeg': setImage(URL.createObjectURL(files));
                break
            case 'png': setImage(URL.createObjectURL(files));
                break
            case 'gif': setImage(URL.createObjectURL(files));
                break
            case 'webp': setImage(URL.createObjectURL(files));
                break
            default: {
                setMessageImg(true);
                let obj = statusImg;
                obj.a = false;
                obj.text = files.name
                setStatusImg(obj)

                return
            }
        }
        setMessageImg(false)
        let obj = statusImg;
        obj.a = true;
        obj.text = files.name
        setStatusImg(obj)
        setFile(files)
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
                <div className="adding-category-input">
                    <span className='adding-category-input-title'>Изображение: </span>
                    <div className='adding-category-input__file-button-container' >
                        <label htmlFor='input__file' className={statusImg.a === null ? "adding-category-input__file-button" : statusImg.a === true ? "adding-category-input__file-button adding-category-input__file-button-secc" : "adding-category-input__file-button adding-category-input__file-button-err"}>
                            <span className='label-img'></span>
                            Выберите файл
                        </label>
                        <span className='adding-category-input__file-name-img'>{statusImg.text}</span>

                        <input onChange={(e) => { CheckingImage(e.target.files[0]); }} id='input__file' type="file" name="" />
                    </div>
                </div>
                <div className="adding-category-right">
                    <img style={messageImg ? { border: "solid 1px red" } : {}} className='adding-category-img-prevention' src={image} alt="" />
                    <div className="adding-category-img-message">{messageImg ? 'Файл не соответствует формату изображения (jpeg, png, gif, webp) или размер файла превышает 50мб.' : ''}</div>
                </div>
                <button onClick={() => { if (valName && name.length > 0) setCategory(true) }} className='adding-category-add-btn'>Добавить</button>
            </div>
        </div>
    )
}

export default AddingCategory