import React from 'react'
import PersonalData from '../PersonalData/PersonalData'
import AdressData from '../AdressData/AdressData'


import './MyData.scss'
function MyData() {
    return (
        <div className='my-data-container'>
            <div className="my-data-content">
                <div className="my-data-title-person">Личные данные</div>
                <PersonalData />
                <div className="my-data-title-adress">Мои адреса</div>
                <AdressData />
                <button className='my-data-btn'>Сохранить изменения</button>
            </div>
        </div>
    )
}

export default MyData