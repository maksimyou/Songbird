import React, { useRef } from 'react'
import { useState } from 'react';
import './ModalEditCategory.scss'
import { useEffect } from 'react';
function ModalEditCategory({ editCategoryApi, isCategory, setCategoryShow, categoryId }) {
    const [file, setFile] = useState([]);
    const [categoryData, setСategoryData] = useState({
        id: "",
        name: "",
        route: "",
        image: "",
    });
    const [image, setImage] = useState();
    const [imagePrev, setImagePrev] = useState(true);
    const [messageImg, setMessageImg] = useState(false);
    const [statusImg, setStatusImg] = useState({ a: null, text: '' })
    const [edit, setEdit] = useState(false);
    const [filess, setFiless] = useState(true);


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
            setImagePrev(true)
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
                setImagePrev(true)

                return
            }
        }
        setMessageImg(false)
        let obj = statusImg;
        obj.a = true;
        obj.text = files.name
        setStatusImg(obj)
        setImagePrev(true)
        setFiless(false)
        setFile(files)
    }


    const createFormData = () => {
        const formData = new FormData();
        formData.append('name', categoryData.name)
        formData.append('route', categoryData.route)
        formData.append('id', categoryData.id)
        formData.append('filess', filess)
        formData.append('files', file)
        console.log(formData)
        return formData
    }

    useEffect(() => {
        if (edit) editCategoryApi(createFormData()); setEdit(false)
    }, [edit])

    useEffect(() => {
        setImage(`https://songbird21.ru/img/${isCategory[categoryId].image}`);
        setСategoryData(isCategory[categoryId]);
    }, [])


    return (
        <div onClick={() => { setCategoryShow(false) }} className='modal-edit-category-container'>
            <div onClick={() => { setCategoryShow(false) }} className="modal-edit-category-close"></div>
            <div onClick={e => e.stopPropagation()} className="modal-edit-category-content">
                <label htmlFor="">Название: <input onChange={(e) => { setСategoryData({ ...categoryData, name: e.target.value }) }} value={categoryData.name} className='modal-edit-category-input-text' type="text" /></label>
                <label htmlFor="">Роутинг: <input onChange={(e) => { setСategoryData({ ...categoryData, route: e.target.value }) }} value={categoryData.route} className='modal-edit-category-input-text' type="text" /></label>
                <div className="modal-edit-category-input">
                    <span className='modal-edit-category-input-title'>Изображение: </span>
                    <div className='modal-edit-category-input__file-button-container' >
                        <label htmlFor='input__file' className={statusImg.a === null ? "modal-edit-category-input__file-button" : statusImg.a === true ? "modal-edit-category-input__file-button modal-edit-category-input__file-button-secc" : "modal-edit-category-input__file-button modal-edit-category-input__file-button-err"}>
                            <span className='label-img'></span>
                            Выберите файл
                        </label>
                        <span className='modal-edit-category-input__file-name-img'>{statusImg.text}</span>
                        <input onChange={(e) => { CheckingImage(e.target.files[0]); }} id='input__file' type="file" name="" />
                    </div>
                </div>
                <div className="modal-edit-category-right">
                    <img style={messageImg ? { border: "solid 1px red" } : {}} className='modal-edit-category-img-prevention' src={imagePrev ? `${image}` : `${image}`} alt="" />
                    <div className="modal-edit-category-img-message">{messageImg ? 'Файл не соответствует формату изображения (jpeg, png, gif, webp) или размер файла превышает 50мб.' : ''}</div>
                </div>
                <button onClick={() => { setEdit(true) }} className='modal-edit-category-add-btn'>Сохранить</button>
            </div>
        </div>
    )
}

export default ModalEditCategory