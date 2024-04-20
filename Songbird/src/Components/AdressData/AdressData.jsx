import { useState, useEffect } from 'react'
import './AdressData.scss'
import close from '../../assets/close.png'
function AdressData({ filterAdress, adress, fullAdress, setAdress, createFullAdress }) {
    const [showVal, setShowVal] = useState(true)
    const [depVal, setDepVal] = useState(false)

    const validationAdress = () => {
        let val = true
        let arr = Object.values(adress);
        console.log(arr.slice(0, -1))


        for (let i = 0; i < arr.length - 1; i++) {
            console.log(arr[i])
            if (arr[i] === '') {
                val = false;
                break;
            }
        }


        setShowVal(val)

        if (val) {
            createFullAdress()
        }
    }


    useEffect(() => {

        if (depVal) validationAdress(); setDepVal(false)

    }, [depVal])

    return (
        <div className='adress-data-container'>
            <form className='adress-data-form' action="">
                <div className="adress-data-lists">
                    {fullAdress.map((e, i) => { return <div key={i} className="adress-data-item">{`${e.name} г.${e.city} ул.${e.street} д.${e.house} кв.${e.apartmentt}`}<img onClick={() => { filterAdress(i) }} src={close} alt="" /></div> })}
                </div>

                <div className="adress-data-form-input">
                    <input onBlur={(e) => { setAdress({ ...adress, name: e.target.value }) }} className={adress.name === '' && !showVal ? 'form-adress-input error-input' : 'form-adress-input'} type="text" placeholder='Название' />
                    <input onBlur={(e) => { setAdress({ ...adress, city: e.target.value }) }} className={adress.city === '' && !showVal ? 'form-adress-input error-input' : 'form-adress-input'} type="text" placeholder='Город' />
                    <input onBlur={(e) => { setAdress({ ...adress, street: e.target.value }) }} className={adress.street === '' && !showVal ? 'form-adress-input error-input' : 'form-adress-input'} type="text" placeholder='Улица' />
                    <div className="form-adress-input-min-all">
                        <input onBlur={(e) => { setAdress({ ...adress, house: e.target.value }) }} className={adress.house === '' && !showVal ? 'form-adress-min-input error-input' : 'form-adress-min-input'} type="text" placeholder='Дом' />
                        {/*<input onBlur={(e) => { setAdress({ ...adress, entrance: e.target.value }) }} className='form-adress-min-input' type="text" placeholder='Под' />*/}
                        {/*<input onBlur={(e) => { setAdress({ ...adress, floor: e.target.value }) }} className='form-adress-min-input' type="text" placeholder='Эт.' />*/}
                        <input onBlur={(e) => { setAdress({ ...adress, apartmentt: e.target.value }) }} className='form-adress-min-input' type="text" placeholder='Кв.' />
                    </div>
                </div>
                {!showVal && <div className="error-adress ">Заполните все обязательные поля ввода</div>}
                <button onClick={(e) => { e.preventDefault(); setDepVal(true); }} className='form-adress-btn'>Добавить адрес</button>
            </form>
        </div>
    )
}

export default AdressData