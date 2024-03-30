import React from 'react'
import './BonusAccount.scss'
import { UserContextFunc } from '../../Context/UserContext'

function BonusAccount() {

    const { isUser, } = UserContextFunc()

    return (
        <div className='bonus-account-container'>
            <div className="bonus-account-content">
                На Вашем бонусном счете: <span>{isUser.bonusAccount}  ₽</span>
            </div>
        </div>
    )
}

export default BonusAccount