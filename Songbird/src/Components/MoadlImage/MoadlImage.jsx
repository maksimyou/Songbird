import React, { useEffect } from 'react'
import './MoadlImage.scss'

import { UserContextFunc } from '../../Context/UserContext'

function MoadlImage({ countImg, setCountImg, setShowModalImg }) {
    const { isGoodsOne, currentImg, setCurrentImg } = UserContextFunc();


    const switchCountImg = () => {
        isGoodsOne.imageURL.forEach((elem, id) => {
            if (countImg === id) setCurrentImg(elem)
        });
    }
    useEffect(() => {
        switchCountImg()
    }, [countImg])

    return (
        <div onClick={() => setShowModalImg(false)} className='moadl-image-container'>
            <div onClick={(e) => e.stopPropagation()} className="moadl-image-content">
                <div onClick={() => setShowModalImg(false)} className="moadl-image-close"></div>
                <div onClick={() => { countImg > 0 ? setCountImg(countImg - 1) : setCountImg(isGoodsOne.imageURL.length - 1) }} className="moadl-image-prev"></div>
                <div className="moadl-image-img">
                    <img src={`https://songbird21.ru/img/${currentImg}`} alt="" />
                </div>
                <div onClick={() => { countImg < isGoodsOne.imageURL.length - 1 ? setCountImg(countImg + 1) : setCountImg(0) }} className="moadl-image-next"></div>
            </div>
        </div>
    )
}

export default MoadlImage