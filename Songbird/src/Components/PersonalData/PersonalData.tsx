import React from 'react'
import './PersonalData.scss'


function PersonalData({myData,setMyData,notifications, setNotifications}) {
  return (
    <div className='personal-data-container'>
            <form className='personal-data-form-person' action="">
                    <div className="personal-data-form-person-input">
                        <input value={myData.name} onChange={(e)=>{setMyData({...myData,name:e.target.value})}} className='form-person-input' type="text" placeholder='Имя' />
                        <input value={myData.phone} onChange={(e)=>{setMyData({...myData,phone:e.target.value})}} className='form-person-input' type="text" placeholder='Телефон' />
                        <input value={myData.birthday} onChange={(e)=>{setMyData({...myData,birthday:e.target.value})}} className='form-person-input' type="text" placeholder='Дата рождения' />
                        <input value={myData.email} onChange={(e)=>{setMyData({...myData,email:e.target.value})}} className='form-person-input' type="text" placeholder='E-mail' />
                    </div>
                    <div className="personal-data-form-person-chekbox">
                        <div className="">
                                <input checked={notifications.sms} onChange={(e)=>{setNotifications({...notifications,sms:e.target.checked})}} type="checkbox" id="sms" />
                                <label htmlFor='sms' className='form-person-checkbox' >Получать уведомления по SMS</label>
                            </div>
                        <div className="">
                                <input  checked={notifications.email} onChange={(e)=>{setNotifications({...notifications,email:e.target.checked})}} type="checkbox" id="mail" />
                                <label htmlFor='mail' className='form-person-checkbox' >Получать уведомления по E-mail</label>
                            </div>
                    </div>
                </form>
    </div>
  )
}

export default PersonalData