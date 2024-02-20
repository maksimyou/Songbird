import React, { useEffect, useState } from 'react'
import './ProductionMore.scss'
import ProductionMoreInfo from '../../Components/ProductionMoreInfo/ProductionMoreInfo'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import { useParams } from 'react-router-dom'
import { UserContextFunc } from '../../Context/UserContext'

function ProductionMore() {
    let nav = useParams();
    const { getOneGoodsApi, isGoodsOne, isCategoryBread } = UserContextFunc();
    useEffect(() => {
        getOneGoodsApi({ id: nav.id })
    }, [])
    return (
        <div className='production-more-container'>
            <div className="production-more-bread-container">
                <BreadCrumbs textLink={['Продукция', isCategoryBread[nav.name], isGoodsOne.name]} location={location} />
            </div>
            <ProductionMoreInfo />
        </div>
    )
}

export default ProductionMore

