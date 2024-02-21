import React from 'react'
import './AdressData.scss'
import close from '../../assets/close.png'
function AdressData({ filterAdress, adress, fullAdress, setAdress, createFullAdress }) {
    return (
        <div className='adress-data-container'>
            <form className='adress-data-form' action="">
                <div className="adress-data-lists">
                    {fullAdress.map((e, i) => { return <div key={i} className="adress-data-item">{e}<img onClick={() => { filterAdress(i) }} src={close} alt="" /></div> })}
                </div>

                <div className="adress-data-form-input">
                    <input onBlur={(e) => { setAdress({ ...adress, name: e.target.value }) }} className='form-adress-input' type="text" placeholder='Название' />
                    <input onBlur={(e) => { setAdress({ ...adress, city: e.target.value }) }} className='form-adress-input' type="text" placeholder='Город' />
                    <input onBlur={(e) => { setAdress({ ...adress, street: e.target.value }) }} className='form-adress-input' type="text" placeholder='Улица' />
                    <div className="form-adress-input-min-all">
                        <input onBlur={(e) => { setAdress({ ...adress, house: e.target.value }) }} className='form-adress-min-input' type="text" placeholder='Дом' />
                        <input onBlur={(e) => { setAdress({ ...adress, entrance: e.target.value }) }} className='form-adress-min-input' type="text" placeholder='Под' />
                        <input onBlur={(e) => { setAdress({ ...adress, floor: e.target.value }) }} className='form-adress-min-input' type="text" placeholder='Эт.' />
                        <input onBlur={(e) => { setAdress({ ...adress, apartmentt: e.target.value }) }} className='form-adress-min-input' type="text" placeholder='Кв.' />
                    </div>
                </div>
                <button onClick={(e) => { e.preventDefault(); createFullAdress() }} className='form-adress-btn'>Добавить адрес</button>
            </form>
        </div>
    )
}

export default AdressData