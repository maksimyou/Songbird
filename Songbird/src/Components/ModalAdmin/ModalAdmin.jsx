import React from 'react'
import './ModalAdmin.scss'
import { UserContextFunc } from '../../Context/UserContext'

function ModalAdmin() {
    const { messageAdmin, setMessageAdminShow } = UserContextFunc()

    return (
        <div className='modal-admin-container'>
            <div className="modal-admin-content">
                <div className="modal-admin-message">{messageAdmin}</div>
                <button className='modal-admin-btn' onClick={() => { setMessageAdminShow(false) }}>Ок,закрыть</button>
            </div>
        </div>
    )
}

export default ModalAdmin