import React, { useEffect, useState } from 'react'
import './ListCategory.scss'
import { UserContextFunc } from '../../Context/UserContext'
import ModalEditCategory from '../ModalEditCategory/ModalEditCategory'
import ListCategoryItem from '../ListCategoryItem/ListCategoryItem'

function ListCategory() {
    const [categoryId, setCategoryId] = useState()
    const [categoryShow, setCategoryShow] = useState(false)
    const { category, setCategory, deleteCategoryApi, isCategory, getAllCategoryApi, editCategoryApi } = UserContextFunc()

    useEffect(() => {
        if (category) getAllCategoryApi(); setCategory(false);
    }, [category])


    useEffect(() => {
        document.title = 'Список всех категорий | Певчий Сластник' || 'songbird21.ru'
    }, [])
    return (
        <div className='list-category-container'>
            {categoryShow && <ModalEditCategory editCategoryApi={editCategoryApi} isCategory={isCategory} setCategoryShow={setCategoryShow} categoryId={categoryId} />}
            <div className="list-category-content">
                <div className="list-category-title-refresh">
                    <div className="list-category-title">Список всех категорий</div>
                </div>
                <div className="list-category-item-list">
                    {
                        isCategory.map((e, iid) => {
                            return <ListCategoryItem setCategoryShow={setCategoryShow} setCategoryId={setCategoryId} image={e.image} deleteCategoryApi={deleteCategoryApi} key={e.id} id={e.id} iid={iid} name={e.name} route={e.route} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ListCategory