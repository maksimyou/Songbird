import React from 'react'
import './AdressData.scss'


function AdressData() {
    return (
        <div className='adress-data-container'>
            <form className='adress-data-form' action="">
                <div className="adress-data-lists">
                    <div className="adress-data-item">Дом г.Москва ул.Маршала Василевского д.1к1 п.5 эт.4 кв.67</div>
                </div>
                <div className="adress-data-form-input">
                    <input className='form-adress-input' type="text" placeholder='Название' />
                    <input className='form-adress-input' type="text" placeholder='Город' />
                    <input className='form-adress-input' type="text" placeholder='Улица' />
                    <div className="form-adress-input-min-all">
                        <input className='form-adress-min-input' type="text" placeholder='Дом' />
                        <input className='form-adress-min-input' type="text" placeholder='Под' />
                        <input className='form-adress-min-input' type="text" placeholder='Эт.' />
                        <input className='form-adress-min-input' type="text" placeholder='Кв.' />
                    </div>
                </div>
                <button className='form-adress-btn'>Добавить адрес</button>
            </form>
        </div>
    )
}

export default AdressData