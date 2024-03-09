import React, { useState, useEffect, useRef } from 'react'
import './AddingGoods.scss'
import { UserContextFunc } from '../../Context/UserContext'
import resize from '../../Hooks/resize'

function AddingGoods() {

    const { addGoodsApi, isCategory } = UserContextFunc()


    const [goods, setGoods] = useState()
    const [file, setFile] = useState([]);
    const [image, setImage] = useState();
    const [messageImg, setMessageImg] = useState(false);
    const [name, setName] = useState('')
    const [price, setPrice] = useState('str')
    const [description, setDescription] = useState('')
    const [composition, setComposition] = useState('');
    const [valueAll, setValueAll] = useState(false);
    const [inputAll, setInputAll] = useState(true);


    const [priceCheck, setPriceCheck] = useState(true);
    const [statusImg, setStatusImg] = useState([{ 0: null, text: '' }])
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState(null)
    const [width, hight] = resize();



    const createFormData = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('quantity', quantity)
        formData.append('composition', composition)
        formData.append('description', description)
        console.log(file)
        for (let i = 0; i < file.length; i++) {
            formData.append('files', file[i])
        }
        console.log(formData)
        return formData
    }


    const CheckingPrice = (str) => {
        const priceRegex = /^\d+$/;

        if (priceRegex.test(str)) {
            setPriceCheck(true)
        } else {
            setPriceCheck(false)
        }
    }

    const CheckingImage = (files, id) => {
        setImage('');
        console.log(id)
        const imageFormat = files.type.split('/').slice(-1)[0].toLowerCase();
        console.log(imageFormat, (files.size / 1024) / 1024);
        if ((files.size / 1024) / 1024 > 50) {
            setMessageImg(true);
            let arr = statusImg;
            arr[id][id] = false;
            arr[id].text = files.name
            setStatusImg(arr)
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
                let arr = statusImg;
                arr[id][id] = false;
                arr[id].text = files.name
                setStatusImg(arr)
                return
            }
        }
        setMessageImg(false)
        let arr = statusImg;
        arr[id][id] = true;
        arr[id].text = files.name
        setStatusImg(arr)
        setFile([...file, files])
    }

    const addObjInputStatus = () => {
        let obj = {};
        obj[statusImg.length] = null;
        obj.text = '';
        setStatusImg([...statusImg, obj]);
    }
    console.log(name === '',
        //price === 'str',
        category === '',
        quantity === null,
        composition === '',
        description === '',
        file.length === 0,
        messageImg,
        +price !== +price

    );
    const allInputFull = () => {
        console.log(name === '',
            //price === 0,
            category === '',
            quantity === true,
            composition === '',
            description === '',
            file.length === 0,
            messageImg,
            +price !== +price
        );
        if (
            name === '' ||
            //price === 0 ||
            category === '' ||
            quantity === null ||
            composition === '' ||
            description === '' ||
            file.length === 0 ||
            messageImg ||
            +price !== +price) {
            setValueAll(false)
            setInputAll(false)
        } else {
            setGoods(true)
            setValueAll(true)
            setInputAll(true)
        }
        valueAll, setValueAll
    }


    useEffect(() => {
        if (goods) {
            if (!messageImg) addGoodsApi(createFormData()); setGoods(false);
        }
    }, [goods])

    return (
        <div className='adding-goods-container'>
            {isCategory.length ? <div className=""></div> : <div className="error-add-message-section">Прежде чем добавить товар необходимо создать категорию товара</div>}
            {inputAll ? '' : <span className='error-price-message'>Заполните все поля ввода и выбора</span>}
            <div className="adding-goods-content">
                <div className="adding-goods-left">
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Имя: </span>
                        <input onBlur={(e) => { setName(e.target.value) }} placeholder='Введите имя' type="text" />
                    </div>
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Цена: </span>
                        <input className={priceCheck ? '' : 'input__file-err'} onBlur={(e) => { setPrice(e.target.value); CheckingPrice(e.target.value) }} placeholder='Введите цену' type="text" />

                    </div>
                    {priceCheck ? '' : <span className='error-price-message'>Введите только цифры и без пробелов</span>}
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Описание: </span>
                        <textarea onBlur={(e) => { setDescription(e.target.value) }} placeholder='Введите описание' type="text" />
                    </div>
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Состав: </span>
                        <textarea onBlur={(e) => { setComposition(e.target.value) }} placeholder='Введите состав' type="text" />
                    </div>
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Тип количества: </span>
                        <select onChange={(e) => { e.target.value === 'true' ? setQuantity(true) : setQuantity(false) }}>
                            <option value='true'>В штуках</option>
                            <option value='false'>В килограмах</option>
                        </select>
                    </div>
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Категория: </span>
                        <select onChange={(e) => { setCategory(e.target.value) }}>
                            <option value=''>{'Выберите категорию'}</option>
                            {isCategory.map(e => {
                                return <>
                                    <option value={e.route}>{e.name}</option>
                                </>
                            })}
                        </select>
                    </div>

                    {/*{categoryCheck ? '' : <span className='error-price-message'>{'Выберите категорию!'}</span>}*/}
                    <div className="adding-goods-input">
                        <span className='adding-goods-input-title'>Изображение: <span className='adding-goods-input-plus' onClick={() => { addObjInputStatus() }}>+</span></span>
                        <div className='input__file-button-container' >
                            {statusImg.map((e, i) => {
                                return <>
                                    <label htmlFor={`input__file-${i}`} className={e[i] === null ? "input__file-button" : e[i] === true ? "input__file-button input__file-button-secc" : "input__file-button input__file-button-err"}>
                                        <span className='label-img'></span>
                                        Выберите файл
                                    </label>
                                    <span className='input__file-name-img'>{e.text}</span>
                                    <input onChange={(e) => { CheckingImage(e.target.files[0], i); }} id={`input__file-${i}`} type="file" name="" />
                                </>
                            })
                            }
                        </div>
                    </div>
                    {width <= 1100 && <div className="adding-goods-right">
                        <img style={messageImg ? { border: "solid 1px red" } : {}} className='adding-goods-img-prevention' src={image} alt="" />
                        <div className="adding-goods-img-message">{messageImg ? 'Файл не соответствует формату изображения (jpeg, png, gif, webp) или размер файла превышает 50мб.' : ''}</div>
                    </div>}
                    <button onClick={() => { allInputFull() }} className='adding-goods-add-btn'>Добавить</button>
                </div>

                {width >= 1101 && <div className="adding-goods-right">
                    <img style={messageImg ? { border: "solid 1px red" } : {}} className='adding-goods-img-prevention' src={image} alt="" />
                    <div className="adding-goods-img-message">{messageImg ? 'Файл не соответствует формату изображения (jpeg, png, gif, webp) или размер файла превышает 50мб.' : ''}</div>
                </div>}
            </div>
        </div >
    )
}

export default AddingGoods

