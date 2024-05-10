import { React, useEffect } from 'react'
import './Main.scss'
import { UserContextFunc } from '../../Context/UserContext'
import HowWeAreWorking from '../../Components/HowWeAreWorking/HowWeAreWorking'
import FAQBlock from '../../Components/FAQBlock/FAQBlock'



function Main() {
    const { setSwitchOrderModal, isSettingHome } = UserContextFunc()

    useEffect(() => {
        document.title = 'Главная | Певчий Сластник - КОНДИТЕРСКИЕ ИЗДЕЛИЯ,ТОРТЫ'
    }, [])

    return (
        <div className="main-container-wrap">
            <div style={{ background: isSettingHome.background }} className='main-container'>
                <div className="header-content-2">
                    <div className="header-content-title-1 animate__animated animate__fadeInUp">{isSettingHome.description || 'Летом со скидкой 15%!'}</div>
                    <h1 className="header-content-title-2 animate__animated animate__fadeInUp">{isSettingHome.title || 'ТОРТЫ НА ЗАКАЗ'}</h1>
                    <div className="header-content-title-3 animate__animated animate__fadeInUp">{isSettingHome.comment || 'При заказе от 3000 рублей скидка 20% и доставка по городу абсолютно бесплатно.'} </div>
                    <button onClick={() => { setSwitchOrderModal(true) }} className='order-btn animate__animated animate__fadeInUp'>
                        <span className='order-text'>{isSettingHome.buttonNames || 'Заказать торт'}</span>
                        <span className='order-decoration'><span></span></span>
                    </button>
                </div>
            </div>
            <HowWeAreWorking />
            <FAQBlock />
        </div>
    )
}

export default Main