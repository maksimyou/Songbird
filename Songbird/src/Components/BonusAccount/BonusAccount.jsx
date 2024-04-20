import React, { useEffect } from 'react'
import './BonusAccount.scss'
import { UserContextFunc } from '../../Context/UserContext'

function BonusAccount() {

    const { isUser, } = UserContextFunc()
    useEffect(() => {
        document.title = 'Бонусный счет | Певчий Сластник' || 'songbird21.ru'
    }, [])
    return (
        <div className='bonus-account-container'>
            <div className="bonus-account-content">
                На Вашем бонусном счете: <span>{isUser.bonusAccount}  ₽</span>
            </div>
        </div>
    )
}

export default BonusAccount