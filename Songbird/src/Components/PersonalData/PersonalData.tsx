import React from 'react'
import './PersonalData.scss'


function PersonalData() {
  return (
    <div className='personal-data-container'>
            <form className='personal-data-form-person' action="">
                    <div className="personal-data-form-person-input">
                        <input className='form-person-input' type="text" placeholder='Имя' />
                        <input className='form-person-input' type="text" placeholder='Телефон' />
                        <input className='form-person-input' type="text" placeholder='Дата рождения' />
                        <input className='form-person-input' type="text" placeholder='E-mail' />
                    </div>
                    <div className="personal-data-form-person-chekbox">
                        <div className="">
                                <input type="checkbox" id="sms" />
                                <label htmlFor='sms' className='form-person-checkbox' >Получать уведомления по SMS</label>
                            </div>
                        <div className="">
                                <input type="checkbox" id="mail" />
                                <label htmlFor='mail' className='form-person-checkbox' >Получать уведомления по E-mail</label>
                            </div>
                    </div>
                </form>
    </div>
  )
}

export default PersonalData