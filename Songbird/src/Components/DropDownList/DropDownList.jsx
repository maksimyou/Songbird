import React, { useState } from 'react'
import './DropDownList.scss'


function DropDownList({ title, text }) {
    const [showList, setShowList] = useState(false);
    return (
        <div className='drop-down-list-container'>
            <div className="drop-down-list-content">
                <div onClick={() => setShowList(!showList)} className="drop-down-list-content-title">{title}<span className={showList ? 'drop-down-list-arrow drop-down-list-arrow-active' : 'drop-down-list-arrow'}></span></div>
                {showList ? <div className="drop-down-list-content-text">{text}</div> : ''}
            </div>
        </div>
    )
}

export default DropDownList


//animate__animated animate__fadeInUp