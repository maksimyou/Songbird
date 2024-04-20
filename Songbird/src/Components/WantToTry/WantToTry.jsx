import React, { useEffect } from 'react'
import './WantToTry.scss'


function WantToTry() {



    useEffect(() => {
        document.title = 'Хочу попробовать | Певчий Сластник' || 'songbird21.ru'
    }, [])
    return (
        <div>WantToTry</div>
    )
}

export default WantToTry