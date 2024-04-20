import React from 'react'
import './Footer.scss'

import telephone from '../../assets/telephone.png'
import geo from '../../assets/geo.png'
import mail from '../../assets/mail.png'


import instagram from '../../assets/instagram.png'
import youtube from '../../assets/youtube.png'
import telegram from '../../assets/telegram.png'
import vk from '../../assets/vk.png'
import { UserContextFunc } from '../../Context/UserContext'

function Footer() {
    const { isSetting } = UserContextFunc()


    return (
        <div className='footer-container'>
            <div className="footer-content">
                <div className="footer-number-place-mail">
                    <div className="footer-content-items">
                        <img src={telephone} alt="" />
                        <div className="footer-item">
                            <div className="footer-item-title">Звоните по номеру</div>
                            <a className='footer-item-subtitle' href={isSetting ? `tel:${isSetting.phone.replace(/[\(|\)|_|\-|\+)]/g, '')}` : ""}>{isSetting ? isSetting.phone : ""}</a>
                        </div>
                    </div>
                    <div className="footer-content-items">
                        <img src={geo} alt="" />
                        <div className="footer-item">
                            <div className="footer-item-title">Мы находимся</div>
                            <div className='footer-item-subtitle'>{isSetting ? isSetting.address : ""}</div>
                        </div>
                    </div>
                    <div className="footer-content-items">
                        <img src={mail} alt="" />
                        <div className="footer-item">
                            <div className="footer-item-title">Пишите сюда</div>
                            <div className='footer-item-subtitle'>{isSetting ? isSetting.email : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="footer-social">
                    <a className='footer-social-link' target='blank' href={isSetting ? `https://www.instagram.com/${isSetting.instagram}/` : ''}><img src={instagram} alt="" /></a>
                    <a className='footer-social-link' target='blank' href={isSetting ? `https://www.youtube.com/@${isSetting.youtube}/` : ''}><img src={youtube} alt="" /></a>
                    <a className='footer-social-link' target='blank' href={isSetting ? `https://t.me/${isSetting.telegram}/` : ''}><img src={telegram} alt="" /></a>
                    <a className='footer-social-link' target='blank' href={isSetting ? `https://vk.com/${isSetting.vkontakte}/` : ''}><img src={vk} alt="" /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer