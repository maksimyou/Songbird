import React from 'react'
import './Loader.scss'
function Loader() {
    return (
        <div className='loader-container'>
            <div className="loader-content">
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        </div>
    )
}

export default Loader