import React from 'react'
import './Production.scss'
import Card from '../../Components/Card/Card'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import products from '../../Data/product-name'
import { useNavigate, useParams } from 'react-router-dom'
function Production() {
    let nav = useParams()
    console.log(nav)
    return (
        <div className='production-container'>
            <div className="production-content">
                <BreadCrumbs product={products.products[nav.name]} />
                <div className="production-items">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>

            </div>
        </div>
    )
}

export default Production