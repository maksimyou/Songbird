import React from 'react'
import './ErrorPage.scss'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import error from '../../assets/error.svg'
import { useEffect } from 'react'

function ErrorPage() {


    useEffect(() => {
        document.title = 'Страница не найдена | Певчий Сластник'
    }, [])
    return (
        <>
            <Header />
            <div className='error-page-container'>
                <img className='error-page-img' src={error} alt="" />
                <div className="error-page-text">Страница была удалена или перемещена</div>
            </div>
            <Footer />
        </>
    )
}

export default ErrorPage