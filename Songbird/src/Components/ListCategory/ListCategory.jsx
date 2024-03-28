import React, { useEffect, useState } from 'react'
import './ListCategory.scss'
import { UserContextFunc } from '../../Context/UserContext'

import ListCategoryItem from '../ListCategoryItem/ListCategoryItem'

function ListCategory() {

    const { category, setCategory, deleteCategoryApi, isCategory, getAllCategoryApi, editCategoryApi } = UserContextFunc()
    useEffect(() => {
        if (category) getAllCategoryApi(); setCategory(false);
    }, [category])

    return (
        <div className='list-category-container'>
            <div className="list-category-content">
                <div className="list-category-title-refresh">
                    <div className="list-category-title">Список всех категорий</div>
                </div>
                <div className="list-category-item-list">
                    {
                        isCategory.map(e => {
                            return <ListCategoryItem deleteCategoryApi={deleteCategoryApi} editCategoryApi={editCategoryApi} key={e.id} id={e.id} name={e.name} route={e.route} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ListCategory