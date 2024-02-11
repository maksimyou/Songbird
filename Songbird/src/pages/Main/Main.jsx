import React from 'react'
import './Main.scss'


function Main() {


    return (
        <div className='main-container'>
            <div className="header-content-2">
                <div className="header-content-title-1 animate__animated animate__fadeInUp">Летом со скидкой 15%!</div>
                <div className="header-content-title-2 animate__animated animate__fadeInUp">ТОРТЫ НА ЗАКАЗ</div>
                <div className="header-content-title-3 animate__animated animate__fadeInUp">При заказе от 3000 рублей скидка 20% и доставка <br />по городу абсолютно бесплатно.</div>
                <button className='order-btn animate__animated animate__fadeInUp'>
                    <span className='order-text'>Заказать торт</span>
                    <span className='order-decoration'><span></span></span>
                </button>
            </div>
        </div>
    )
}

export default Main