import React, { useState } from 'react'
import './FAQBlock.scss'

import FAQBlockItems from '../FAQBlockItems/FAQBlockItems'
function FAQBlock() {

    const [faqSwitch, setFaqSwitch] = useState(0)
    return (
        <div className='faq-block-container'>
            <div className="faq-block-content">
                <div className="faq-block-title">Часто задаваемые вопросы</div>
                <div className="faq-block-items">
                    <div className="faq-block-items-left">
                        <FAQBlockItems faqSwitch={faqSwitch} setFaqSwitch={setFaqSwitch} number={1} question={"Чем мои торты отличаются от магазинных?"}>
                            <div className="">
                                <div className="">Во-первых: я использую только свежие натуральные продукты. Никаких
                                    заменителей и химии.
                                </div>
                                <div className="">Во-вторых: каждый торт делаю индивидуально по Вашим предпочтениям. Выполню
                                    любую задумку.
                                </div>
                                <div className="">В-третьих: Большой выбор натуральных начинок. Я делаю начинки по проверенным
                                    рецептам. Но могу изменить состав по вашей просьбе.
                                </div>
                                <div className="">  Но главное отличие - это вкус!
                                </div>
                            </div>
                        </FAQBlockItems>
                        <FAQBlockItems faqSwitch={faqSwitch} setFaqSwitch={setFaqSwitch} number={2} question={'Как сделать заказ?'}>
                            <div className="">Формить заказ на торт или десерт Вы можете по телефону или через мессенджеры с 8:00 до 20:00.</div>
                            <div className="">В каталоге на сайте вы можете посмотреть примеры тортов, выбрать начинку.</div>
                            <div className="">Для заказа нужно выбрать: цвет, начинку, вес, количество ярусов, цифры, надписи и другой декор. Поэтому лучше по телефону или встретиться лично.</div>
                            <div className="">Так же вы можете отправлять фото или эскизы в мессенджерах и ВК.</div>
                            <div className="">Заказы на торты принимаются за 3 дня до даты исполнения, на десерты - в течение дня.</div>
                        </FAQBlockItems>
                        <FAQBlockItems faqSwitch={faqSwitch} setFaqSwitch={setFaqSwitch} number={3} question={"Чем мои торты отличаются от магазинных?"}>
                            <div className="">
                                <div className="">Во-первых: я использую только свежие натуральные продукты. Никаких
                                    заменителей и химии.
                                </div>
                                <div className="">Во-вторых: каждый торт делаю индивидуально по Вашим предпочтениям. Выполню
                                    любую задумку.
                                </div>
                                <div className="">В-третьих: Большой выбор натуральных начинок. Я делаю начинки по проверенным
                                    рецептам. Но могу изменить состав по вашей просьбе.
                                </div>
                                <div className="">  Но главное отличие - это вкус!
                                </div>
                            </div>
                        </FAQBlockItems>
                        <FAQBlockItems faqSwitch={faqSwitch} setFaqSwitch={setFaqSwitch} number={4} question={'Как сделать заказ?'}>
                            <div className="">Формить заказ на торт или десерт Вы можете по телефону или через мессенджеры с 8:00 до 20:00.</div>
                            <div className="">В каталоге на сайте вы можете посмотреть примеры тортов, выбрать начинку.</div>
                            <div className="">Для заказа нужно выбрать: цвет, начинку, вес, количество ярусов, цифры, надписи и другой декор. Поэтому лучше по телефону или встретиться лично.</div>
                            <div className="">Так же вы можете отправлять фото или эскизы в мессенджерах и ВК.</div>
                            <div className="">Заказы на торты принимаются за 3 дня до даты исполнения, на десерты - в течение дня.</div>
                        </FAQBlockItems>
                    </div>
                    <div className="faq-block-items-right">
                        <FAQBlockItems faqSwitch={faqSwitch} setFaqSwitch={setFaqSwitch} number={5} question={"Чем мои торты отличаются от магазинных?"}>
                            <div className="">
                                <div className="">Во-первых: я использую только свежие натуральные продукты. Никаких
                                    заменителей и химии.
                                </div>
                                <div className="">Во-вторых: каждый торт делаю индивидуально по Вашим предпочтениям. Выполню
                                    любую задумку.
                                </div>
                                <div className="">В-третьих: Большой выбор натуральных начинок. Я делаю начинки по проверенным
                                    рецептам. Но могу изменить состав по вашей просьбе.
                                </div>
                                <div className="">  Но главное отличие - это вкус!
                                </div>
                            </div>
                        </FAQBlockItems>
                        <FAQBlockItems faqSwitch={faqSwitch} setFaqSwitch={setFaqSwitch} number={6} question={'Как сделать заказ?'}>
                            <div className="">Формить заказ на торт или десерт Вы можете по телефону или через мессенджеры с 8:00 до 20:00.</div>
                            <div className="">В каталоге на сайте вы можете посмотреть примеры тортов, выбрать начинку.</div>
                            <div className="">Для заказа нужно выбрать: цвет, начинку, вес, количество ярусов, цифры, надписи и другой декор. Поэтому лучше по телефону или встретиться лично.</div>
                            <div className="">Так же вы можете отправлять фото или эскизы в мессенджерах и ВК.</div>
                            <div className="">Заказы на торты принимаются за 3 дня до даты исполнения, на десерты - в течение дня.</div>
                        </FAQBlockItems>
                        <FAQBlockItems faqSwitch={faqSwitch} setFaqSwitch={setFaqSwitch} number={7} question={"Чем мои торты отличаются от магазинных?"}>
                            <div className="">
                                <div className="">Во-первых: я использую только свежие натуральные продукты. Никаких
                                    заменителей и химии.
                                </div>
                                <div className="">Во-вторых: каждый торт делаю индивидуально по Вашим предпочтениям. Выполню
                                    любую задумку.
                                </div>
                                <div className="">В-третьих: Большой выбор натуральных начинок. Я делаю начинки по проверенным
                                    рецептам. Но могу изменить состав по вашей просьбе.
                                </div>
                                <div className="">  Но главное отличие - это вкус!
                                </div>
                            </div>
                        </FAQBlockItems>
                        <FAQBlockItems faqSwitch={faqSwitch} setFaqSwitch={setFaqSwitch} number={8} question={'Как сделать заказ?'}>
                            <div className="">Формить заказ на торт или десерт Вы можете по телефону или через мессенджеры с 8:00 до 20:00.</div>
                            <div className="">В каталоге на сайте вы можете посмотреть примеры тортов, выбрать начинку.</div>
                            <div className="">Для заказа нужно выбрать: цвет, начинку, вес, количество ярусов, цифры, надписи и другой декор. Поэтому лучше по телефону или встретиться лично.</div>
                            <div className="">Так же вы можете отправлять фото или эскизы в мессенджерах и ВК.</div>
                            <div className="">Заказы на торты принимаются за 3 дня до даты исполнения, на десерты - в течение дня.</div>
                        </FAQBlockItems>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FAQBlock