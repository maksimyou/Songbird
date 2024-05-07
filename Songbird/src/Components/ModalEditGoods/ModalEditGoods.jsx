import React, { useState } from 'react'
import './ModalEditGoods.scss'
import { useEffect } from 'react'


import { UserContextFunc } from '../../Context/UserContext'

function ModalEditGoods({ isGoods, isCategory, goodsId, setShowModalEdit }) {
    const [goods, setGoods] = useState(isGoods[goodsId])
    const [selectImg, setSelectImg] = useState(0)
    const [modeEdit, setModeEdit] = useState(true)
    const [statusImg, setStatusImg] = useState([{ 0: null, text: '' }])
    const [file, setFile] = useState([]);
    const [image, setImage] = useState();
    const [messageImg, setMessageImg] = useState(false);
    const { editGoodsText, editGoodsImg, addGoodsImg } = UserContextFunc();

    const [editText, setEditText] = useState(false)
    const [editImg, setEditImg] = useState(false)
    const [addImg, setAddImg] = useState(false)





    console.log(goods)

    const addObjInputStatus = () => {
        let obj = {};
        obj[statusImg.length] = null;
        obj.text = '';
        setStatusImg([...statusImg, obj]);
    }

    const filterPrevious = (id) => {
        let img = goods.imageURL[id];
        let arr = goods.imageURL.filter((e, idd) => idd !== id)
        arr.unshift(img)
        setGoods({ ...goods, imageURL: arr })
        setSelectImg(0)
    }

    const deleteImage = (id) => {
        console.log('GGGGGG')
        let arr = goods.imageURL.filter((e, idd) => idd !== id)
        setGoods({ ...goods, imageURL: arr })
    }


    const createFormData = () => {
        const formData = new FormData();
        formData.append('idGoods', goods.id)
        for (let i = 0; i < file.length; i++) {
            formData.append('files', file[i])
        }
        return formData
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

    useEffect(() => {
        if (editText) { editGoodsText({ ...goods, idGoods: goods.id }); setEditText(false) }
        if (editImg) { editGoodsImg({ idGoods: goods.id, list: JSON.stringify(goods.imageURL) }); setEditImg(false) }
        if (addImg) { addGoodsImg(createFormData()); setAddImg(false) }
    }, [editText,
        editImg,
        addImg])

    return (
        <div className='modal-edit-goods-container'>
            <div onClick={() => { setShowModalEdit(false) }} className="modal-edit-goods-close">X</div>
            <div className="modal-edit-goods-content">
                <div className="modal-edit-goods-data">
                    <label className='modal-edit-goods-label' htmlFor="">
                        Выберите категорию
                        <select value={goods.goods} className='modal-edit-goods-select' onChange={(e) => { setGoods({ ...goods, category: e.target.value }) }}>
                            {/*<option required selected disabled hidden value=''>{'Выберите категорию'}</option>*/}
                            {isCategory.map(e => {
                                return <>
                                    <option value={e.route}>{e.name}</option>
                                </>
                            })}
                        </select>
                    </label>
                    <label className='modal-edit-goods-label' htmlFor="">Название товара<input onChange={(e) => { setGoods({ ...goods, name: e.target.value }) }} className='modal-edit-goods-input' value={goods.name} placeholder='Название товара' type="text" /></label>
                    <label className='modal-edit-goods-label' htmlFor="">Цена товара<input onChange={(e) => { setGoods({ ...goods, price: e.target.value }) }} className='modal-edit-goods-input' value={goods.price} placeholder='Цена товара' type="number" /></label>
                    <label className='modal-edit-goods-label' htmlFor="">Описание товара<textarea onChange={(e) => { setGoods({ ...goods, description: e.target.value }) }} className='modal-edit-goods-textarea' value={goods.description} placeholder='Описание товара' type="text" name="" id="" /></label>
                    <label className='modal-edit-goods-label' htmlFor="">Состав товара<textarea onChange={(e) => { setGoods({ ...goods, composition: e.target.value }) }} className='modal-edit-goods-textarea' value={goods.composition} placeholder='Состав товара' name="" id=""></textarea></label>
                    <label className='modal-edit-goods-label' htmlFor="">
                        Количество
                        <select onChange={(e) => { setGoods({ ...goods, quantity: e.target.value }) }} className='modal-edit-goods-select' value={goods.quantity} name="" id="">
                            <option value="true">Штуки</option>
                            <option value="false">Килограммы</option>
                        </select>
                    </label>
                    <button onClick={() => setEditText(true)} className='modal-edit-goods-btn'>Сохранить изменения</button>
                </div>
                <div className="modal-edit-goods-images">
                    <div className="modal-edit-goods-images-title">Выберите превью товара</div>
                    <div className="">
                        <div className="modal-edit-goods-images-cover">
                            <img src={`https://songbird21.ru/img/${goods.imageURL[selectImg]}`} alt="" />
                        </div>
                        <div className="modal-edit-goods-mode">
                            <div className="modal-edit-goods-mode-title">Режим:</div>
                            <div className="modal-edit-goods-mode-btns">
                                <button onClick={() => { setModeEdit(true) }} className={modeEdit ? 'modal-edit-goods-mode-btn modal-edit-goods-mode-btn-active' : 'modal-edit-goods-mode-btn'}>Превью</button>
                                <button onClick={() => { setModeEdit(false) }} className={modeEdit ? 'modal-edit-goods-mode-btn' : 'modal-edit-goods-mode-btn modal-edit-goods-mode-btn-active'}>Удалить</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-edit-goods-images-items">
                        {goods.imageURL.map((e, id) => {
                            return <>
                                {modeEdit ? <div onClick={() => { setSelectImg(id); filterPrevious(id) }} className={id === selectImg ? 'review-images-outline review-images' : 'review-images'}>
                                    <img src={`https://songbird21.ru/img/${e}`} alt="" />
                                </div>
                                    :
                                    <div className='review-images2'>
                                        <img src={`https://songbird21.ru/img/${e}`} alt="" />
                                        <div onClick={() => deleteImage(id)} className="radio-img">&#x2715;</div>
                                    </div >}
                            </>
                        })
                        }
                    </div>
                    <button onClick={() => setEditImg(true)} className='modal-edit-goods-btn'>Сохранить изменения</button>
                </div>

                <div className="modal-edit-goods-images-add">
                    {/*<input className='modal-edit-goods-images-add-input' type="file" name="" id="" />*/}




                    <div className="modal-edit-goods-right">
                        <img style={messageImg ? { border: "solid 1px red" } : {}} className='modal-edit-goods-img-prevention' src={image} alt="" />
                        <div className="modal-edit-goods-img-message">{messageImg ? 'Файл не соответствует формату изображения (jpeg, png, gif, webp) или размер файла превышает 50мб.' : ''}</div>
                    </div>



                    <div className="modal-edit-goods-input2">
                        <span className='modal-edit-goods-input-title'>Изображение: <span className='modal-edit-goods-input-plus' onClick={() => { addObjInputStatus() }}>+</span></span>
                        <div className='modal-edit-input__file-button-container' >
                            {statusImg.map((e, i) => {
                                return <>
                                    <label htmlFor={`input__file-${i}`} className={e[i] === null ? "modal-edit-input__file-button" : e[i] === true ? "modal-edit-input__file-button modal-edit-input__file-button-secc" : "modal-edit-input__file-button modal-edit-input__file-button-err"}>
                                        <span className='modal-edit-label-img'></span>
                                        Выберите файл
                                    </label>
                                    <span className='modal-edit-input__file-name-img'>{e.text}</span>
                                    <input onChange={(e) => { CheckingImage(e.target.files[0], i); }} id={`input__file-${i}`} type="file" name="" />
                                </>
                            })
                            }
                        </div>
                    </div>




                    {/*<div className="modal-edit-goods-images-prevention">

                    </div>*/}
                    <button onClick={() => setAddImg(true)} className='modal-edit-goods-btn'>Добавить изображения</button>
                </div>
            </div>
        </div >
    )
}

export default ModalEditGoods