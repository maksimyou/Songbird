import React, { useEffect, useState } from 'react'
import './ProductionMore.scss'
import ProductionMoreInfo from '../../Components/ProductionMoreInfo/ProductionMoreInfo'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import { useParams } from 'react-router-dom'
import { UserContextFunc } from '../../Context/UserContext'

function ProductionMore() {
    let nav = useParams();
    const { isAuth, getOneGoodsApi, getOneGoodsUserApi, isGoodsOne, isCategoryBread, getOneGoodsDev, setGetOneGoodsDev } = UserContextFunc();


    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            getOneGoodsUserApi(({ id: nav.id })); setGetOneGoodsDev(false)
        } else {
            getOneGoodsApi({ id: nav.id }); setGetOneGoodsDev(false)
        }
    }, [getOneGoodsDev])

    useEffect(() => {


        if (isAuth) {
            getOneGoodsUserApi(({ id: nav.id }))
        } else {
            getOneGoodsApi({ id: nav.id })
        }
    }, [])

    return (
        <div className='production-more-container'>
            <div className="production-more-bread-container">
                <BreadCrumbs styleWidth={480} textLink={['Продукция', isCategoryBread[nav.name], isGoodsOne.name]} location={location} />
            </div>
            {isGoodsOne.length ? '' : <ProductionMoreInfo />}
        </div>
    )
}

export default ProductionMore

