import React from 'react'
import './SettingsMainPage.scss'


import { UserContextFunc } from '../../Context/UserContext'
import { useEffect } from 'react'
import { useState } from 'react'

function SettingsMainPage() {
    const { isSettingHome, setIsSettingHome, getSettingHome,
        updateAddSettingHome, } = UserContextFunc()
    const [devHome, setDevHome] = useState(false)
    const [colorTrans, setColorTrans] = useState(false)

    const handlerClickColor = () => {
        if (colorTrans) {
            setIsSettingHome({ ...isSettingHome, background: 'transparent' }); setDevHome(false)
        }
    }

    useEffect(() => {
        if (devHome) {
            if (colorTrans) {
                //setIsSettingHome({ ...isSettingHome, background: 'transparent' })
                console.log(isSettingHome)
                updateAddSettingHome(isSettingHome); setDevHome(false)
            } else {
                updateAddSettingHome(isSettingHome); setDevHome(false)
            }
        }
    }, [devHome])

    useEffect(() => {
        getSettingHome()
    }, [])


    return (
        <div className='settings-main-page-container'>
            <div className="settings-main-page-title">Настройки главной страницы</div>

            <div className="settings-main-page-content">
                <div className="settings-main-page-content-left">
                    <div className="settings-main-page-content-right-block1">Секция 1</div>
                    <div className="settings-main-page-input">
                        <span className='settings-main-page-input-title'>Заголовок: </span>
                        <input value={isSettingHome.title} onChange={(e) => { setIsSettingHome({ ...isSettingHome, title: e.target.value }) }} placeholder='Введите заголовок' type="text" />
                    </div>
                    <div className="settings-main-page-input">
                        <span className='settings-main-page-input-title'>Описание: </span>
                        <input value={isSettingHome.description} onChange={(e) => { setIsSettingHome({ ...isSettingHome, description: e.target.value }) }} placeholder='Введите описание' type="text" />
                    </div>

                    <div className="settings-main-page-input">
                        <span className='settings-main-page-input-title'>Комментарии: </span>
                        <input value={isSettingHome.comment} onChange={(e) => { setIsSettingHome({ ...isSettingHome, comment: e.target.value }) }} placeholder='Введите комментарий' type="text" />
                    </div>

                    <div className="settings-main-page-input">
                        <span className='settings-main-page-input-title'>Текст кнопки: </span>
                        <input value={isSettingHome.buttonNames} onChange={(e) => { setIsSettingHome({ ...isSettingHome, buttonNames: e.target.value }) }} placeholder='Введите текст кнопки' type="text" />
                    </div>


                    <div className="settings-main-page-input">
                        <span className='settings-main-page-input-title'>Цвет заднего фона: </span>
                        <div className="settings-main-page-input-trans">
                            <input value={isSettingHome.background} onChange={(e) => { setIsSettingHome({ ...isSettingHome, background: e.target.value }) }} placeholder='Введите название' type='color' />
                            <span>или</span>
                            <div className="settings-main-page-input-trans2">
                                <input onClick={() => { setColorTrans(!colorTrans) }} value={colorTrans} type="checkbox" name="" id="transparent" />
                                <label htmlFor="transparent">Прозрачный</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="settings-main-page-content-right"></div>

            </div>
            <button onClick={() => {
                handlerClickColor(); setDevHome(true)
            }} className='settings-main-page-add-btn'>Изменить</button>

        </div>
    )
}

export default SettingsMainPage


