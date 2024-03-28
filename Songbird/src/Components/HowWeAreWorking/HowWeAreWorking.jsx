import React from 'react'
import HowWeAreWorkingCard from '../HowWeAreWorkingCard/HowWeAreWorkingCard'
import './HowWeAreWorking.scss'
function HowWeAreWorking() {
    return (
        <div className='how-we-are-working-container'>
            <div className="how-we-are-working-content">
                <div className="how-we-are-working-title">Как мы работаем</div>
                <div className="how-we-are-working-items">
                    <HowWeAreWorkingCard number={'01'} title={'Получаем заказ'} text={'Получаем заказ и связываемся с Вами для уточнения деталей'} />
                    <HowWeAreWorkingCard number={'02'} title={'Готовим заказ'} text={'Готовим заказ в строгом соответствии с пожеланиями клиента'} />
                    <HowWeAreWorkingCard number={'03'} title={'Отправляем товар'} text={'Отправляем Ваш заказ ранее утвержденным Вами способом'} />
                    <HowWeAreWorkingCard number={'04'} title={'Доставка и оплата'} text={'Наш курьер доставит товар по Вашему адресу прямо в руки'} />
                </div>
            </div>
        </div>
    )
}

export default HowWeAreWorking