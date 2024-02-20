import React, { useEffect, useState } from 'react'
import './Production.scss'
import Card from '../../Components/Card/Card'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import products from '../../Data/product-name'
import { useNavigate, useParams } from 'react-router-dom'

import { UserContextFunc } from '../../Context/UserContext'

function Production() {
    const { isCategoryBread, isSwitchCategory, setIsSwitchCategory, isGoods, isCategory, getCategoryGoods, isCategoryGoods, } = UserContextFunc()
    let nav = useParams()
    //const [breadCrumb, setBreadCrumb] = useState('')
    console.log(nav, isCategoryBread)
    //const filterGoodsProduction = () => {
    //    return isGoods.filter(e => e.category === nav.name)
    //}
    //const filterCategory = () => {
    //    return isCategory.filter(e => e.route === nav.name)[0].name    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //}
    //console.log(goodsCard)

    useEffect(() => { getCategoryGoods({ category: nav.name }); }, [])


    useEffect(() => {
        console.log(nav)
        if (isSwitchCategory) getCategoryGoods({ category: nav.name }); setIsSwitchCategory(false)
        //setGoodsCard(filterGoodsProduction())
    }, [isSwitchCategory])


    return (
        <div className='production-container'>
            <div className="production-content">
                {/*<BreadCrumbs product={isCategoryBread[nav.name]} />*/}
                <BreadCrumbs textLink={['Продукция', isCategoryBread[nav.name]]} location={location} />

                <div className="production-items">
                    {isCategoryGoods.map(e => {
                        return <Card key={e.id} nav={nav.name} id={e.id} image={e.imageURL} name={e.name} price={e.price} bought={e.bought} liked={e.liked} />
                    })}
                </div>

            </div>
        </div>
    )
}

export default Production