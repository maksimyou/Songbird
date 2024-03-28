import React from 'react'
import './FAQBlockItems.scss'
import arrowDown from '../../assets/arrow-down.svg'

function FAQBlockItems({ faqSwitch, setFaqSwitch, number, question, children }) {
    return (
        <div className='faq-block-items-container'>
            <div className="faq-block-items-content">
                <div onClick={() => { faqSwitch === number ? setFaqSwitch(0) : setFaqSwitch(number) }} className="faq-block-items-title">
                    <span>{question}</span>
                    <img className={faqSwitch === number ? 'faq-block-items-title-img faq-block-items-title-img-active' : 'faq-block-items-title-img'} src={arrowDown} alt="" />
                </div>
                <div className={faqSwitch === number ? "faq-block-items-text" : 'faq-block-items-text faq-block-items-text-hidden'}>{children}</div>
            </div>
        </div>
    )
}

export default FAQBlockItems


//faq-block-items-title-img