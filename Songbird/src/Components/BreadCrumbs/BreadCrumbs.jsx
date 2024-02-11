import React from 'react'
import './BreadCrumbs.scss'
import arrow from '../../assets/icon-right-arrow.png'
function BreadCrumbs({ product }) {

    return (
        <div className='bread-crumbs-container'>
            <div className="bread-crumbs-content">
                <div className="bread-crumbs-text">Продукция</div>
                <img src={arrow} alt="" />
                <div className='bread-crumbs-text'>{product}</div>
            </div>
        </div>
    )
}

export default BreadCrumbs