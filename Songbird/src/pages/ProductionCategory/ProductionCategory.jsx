import React from 'react'
import './ProductionCategory.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import { UserContextFunc } from '../../Context/UserContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'


function ProductionCategory() {
    const [showText, setShowText] = useState(false)
    const { depCategoryTitle, setDepCategoryTitle, getAllCategoryApi, isCategoryBread, isSwitchCategory, setIsSwitchCategory, isGoods, isCategory, getCategoryGoods, getCategoryGoodsNoload, isCategoryGoods, } = UserContextFunc()

    let nav = useParams()


    return (
        <div className='production-category-container'>
            <div className="production-category-content">
                <BreadCrumbs textLink={['Продукция', isCategoryBread[nav.name]]} location={location} />

                <div className="production-category-items">
                    {isCategory.map(e => {
                        return <> <Link to={`/products/${e.route}`}><div className='production-category-card'>
                            <div className='production-category-img' style={{ backgroundImage: `url(https://songbird21.ru/img/${e.image})` }} >
                                <div className='production-category-card-text' >{e.name}</div>
                            </div>
                            <button className="production-category-btn">Подробнее</button>
                        </div>
                        </Link>
                        </>
                    })}
                </div>

            </div>
        </div>
    )
}

export default ProductionCategory