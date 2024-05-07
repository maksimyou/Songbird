import dotenv from 'dotenv'
import Models from '../models/models.js'
import nodemailer from 'nodemailer'
dotenv.config()
import axios from 'axios'
const { EMAIL_HOST_USER2, EMAIL_HOST_PASSWORD2, EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;
class mailController {
    #transparter = null;
    #transparter2 = null;

    constructor() {
        this.#transparter = this.#getTransporter()
        this.#transparter2 = this.#getTransporter2()
    }

    #getTransporter() {
        return nodemailer.createTransport({
            //host: 'smtp.gmail.com',
            //port: 465,
            ////service: "gmail",
            //secure: true,
            //auth: {
            //    user: 'maksimyou@gmail.com',
            //    pass: 'fpgw dsok yrid mzlm'
            //},
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            //service: "gmail",
            secure: true,
            auth: {
                user: EMAIL_HOST_USER,
                pass: EMAIL_HOST_PASSWORD
            },
            tls: {
                //do not fail on invalid certs
                rejectUnauthorized: false,
            },
        })
    }

    #getTransporter2() {
        return nodemailer.createTransport({
            //host: 'smtp.gmail.com',
            //port: 465,
            ////service: "gmail",
            //secure: true,
            //auth: {
            //    user: 'maksimyou@gmail.com',
            //    pass: 'fpgw dsok yrid mzlm'
            //},
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            //service: "gmail",
            secure: true,
            auth: {
                user: EMAIL_HOST_USER2,
                pass: EMAIL_HOST_PASSWORD2
            },
            tls: {
                //do not fail on invalid certs
                rejectUnauthorized: false,
            },
        })
    }

    async send(reciever, message) {
        console.log(reciever, message)
        const setting = await Models.SettingSite.findAll()

        try {
            let info = await this.#transparter.sendMail({
                from: {
                    name: 'Певчий Сластник',
                    address: 'notify@songbird21.ru'
                },
                to: reciever,
                subject: 'Добро пожаловать на сайт!',
                text: message,
                html: `
                <div style="padding:20px 10px; margin: 0 auto; width:60%; background: #cca275; display:flex; align-items: center; justify-content: center;">
                    <img style="width:80px; margin: 0 15px 0 25%;" src='https://songbird21.ru/assets/logo-49XS5Dp5.png' alt="" />
                    <div>
                        <div style="font-size:24px;color: #333333;font-family:'Arial',sans-serif; text-transform: uppercase;">Певчий сластник</div>
                        <div style="font-size:20px;color: #333333;font-family:'Arial',sans-serif; text-transform: uppercase;">Кондитерские изделия,торты</div>
                    </div>
                </div>
                <div style="margin-top:25px; text-align: center;font-size:24px;color: #333333;font-family:'Arial',sans-serif;">Подтвердите адрес
                    электроной почты</div>
                <div style="text-align: center; margin: 35px 0;">
                    <span style="font-size:14px;color:#888888; font-family:'Arial',sans-serif;">КОД:</span>
                    <span style="font-size:24px;color:#333333; font-family:'Arial',sans-serif;">${message}</span>
                </div>
                <div style="text-align: center; margin-bottom: 15px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Пожалуйста,
                    подтвердите свой адрес
                    электронной почты, чтобы завершить регистрацию.</div>
                <div style="text-align: center; border-bottom:1px solid #333333; width: 100%;height: 10px;"></div>
                <div style="text-align: center; margin:13px 0 59px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">
                    Примечание: это сообщение отправлено с электронного адреса, предназначенного только для рассылки исходящих
                    электронных сообщений и не принимающего входящих электронных сообщений. Пожалуйста, не отвечайте на это
                    сообщение. Если вы не регистрировались на, возможно, кто-то другой по ошибке указал ваш адрес электронной почты.
                    <a style="text-decoration: none;border-bottom: 1px solid #333333; font-size:14px;color:#d2ab04; font-family:'Arial',sans-serif;"
                        href="https://songbird21.ru/account-deleting">Вы
                        можете удалить
                        аккаунт</a>
                </div>
                <div style="text-align: center; border-bottom:1px solid #333333; width: 100%;height: 10px;"></div>
                <div style="margin-top:25px;padding:20px 10px; margin: 0 auto; width:60%; background: #0a0905;  display:flex; align-items: center; justify-content: center;">
                    <div style="margin: 0 20% 0 25%;display:flex; align-items: center; justify-content: center;">
                        <img style="width:20px; margin-right:10px" src='https://songbird21.ru/assets/telephone.png' alt="" />
                        <div>
                            <div style="margin-bottom: 7px; font-size: 14px;font-weight: 400; font-family:'Arial',sans-serif; color:#ffffff66;">Звоните по номеру</div>
                            <a style="font-size: 14px;font-weight: 400;color:white;" href='tel:${setting[0].phone.replace(/[\(|\)|_|\-|\+)]/g, '')}'>${setting[0].phone}</a>
                        </div>
                    </div>
                    <div style="display:flex; align-items: center; justify-content: center;">
                        <img style="width:20px; margin-right:10px" src='https://songbird21.ru/assets/geo.png' alt="" />
                        <div>
                            <div style="margin-bottom: 7px; font-size: 14px;font-weight: 400; font-family:'Arial',sans-serif; color:#ffffff66;">Мы находимся</div>
                            <div style="font-size: 14px;font-weight: 400;color:white;">${setting[0].address}</div>
                        </div>
                    </div>
                </div>
            `
            })
            return info.messageId
        } catch (error) {
            return error;
        }
    }



    async send2(reciever, id) {
        console.log(reciever, id)
        const order = await Models.Order.findOne({ where: { id } })
        const setting = await Models.SettingSite.findAll()
        console.log(`${order.updatedAt.getFullYear()}-${this.formatNumber(order.updatedAt.getMonth())}-${this.formatNumber(order.updatedAt.getDate())}`)
        try {
            let info = await this.#transparter2.sendMail({
                from: {
                    name: 'Певчий Сластник',
                    address: 'order@songbird21.ru'
                },
                to: reciever,
                subject: 'Ваш заказ оформлен!',
                text: '',
                html: `
                <div style="padding:20px 10px; margin: 0 auto; width:60%; background: #cca275; display:flex; align-items: center; justify-content: center;">
                <img style="width:80px; margin: 0 15px 0 25%;" src='https://songbird21.ru/assets/logo-49XS5Dp5.png' alt="" />
                <div>
                    <div style="font-size:24px;color: #333333;font-family:'Arial',sans-serif; text-transform: uppercase;">Певчий сластник</div>
                    <div style="font-size:20px;color: #333333;font-family:'Arial',sans-serif; text-transform: uppercase;">Кондитерские изделия,торты</div>
                </div>
                </div>
                <div style="margin: 0 auto; width:60%; ">
                    <div style="margin-top:25px; text-align: center;font-size:24px;color: #333333;font-family:'Arial',sans-serif;">Ваш заказ успешно оформлен!</div>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Номер заказа: <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">№ ${order.id}</strong></p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Дата заказа: <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${order.updatedAt.getFullYear()}-${this.formatNumber(order.updatedAt.getMonth() + 1)}-${this.formatNumber(order.updatedAt.getDate())}</strong></p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Сумма заказа: <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${order.priceGoods}  ₽</strong></p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Способ оплаты: <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${order.paymentMethod}</strong></p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Способ доставки: <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${order.coordination ? 'По согласованию' : order.typeDelivery}</strong></p>
                    <br />
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Спасибо за ваш заказ! Мы рады, что вы выбрали наш магазин.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Ваш заказ успешно оформлен. В ближайшее время с вами свяжется наш сотрудник.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Вы получите после оплаты <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${order.chargedBonuses}  ₽</strong> бонусных баллов за этот заказ.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Используйте ваши бонусные баллы для получения скидки на будущие покупки.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Мы сообщим вам по электронной почте, когда ваш заказ будет отправлен.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Вы можете отслеживать статус вашего заказа по электронной почте или в <a style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;" href='https://songbird21.ru/personal-area/history-of-orders'>Личном кабинете.</a></p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Если у вас есть какие-либо вопросы, пожалуйста, не стесняйтесь обращаться к нам по электроной почте <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${setting[0].email}</strong> или телефону <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${setting[0].phone}</strong>.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">С уважением,</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Команда songbird21.ru</p>
                    </div>
                <div style="text-align: center; border-bottom:1px solid #333333; width: 100%;height: 10px;"></div>
                <div style="text-align: center; margin:13px 0 59px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">
                Примечание: это сообщение отправлено с электронного адреса, предназначенного только для рассылки исходящих
                электронных сообщений и не принимающего входящих электронных сообщений. Пожалуйста, не отвечайте на это
                сообщение. Если вы не регистрировались на, возможно, кто-то другой по ошибке указал ваш адрес электронной почты.
                <a style="text-decoration: none;border-bottom: 1px solid #333333; font-size:14px;color:#d2ab04; font-family:'Arial',sans-serif;"
                    href="https://songbird21.ru/account-deleting">Вы
                    можете удалить
                    аккаунт</a>
                </div>
                <div style="text-align: center; border-bottom:1px solid #333333; width: 100%;height: 10px;"></div>
                <div style="margin-top:25px;padding:20px 10px; margin: 0 auto; width:60%; background: #0a0905;  display:flex; align-items: center; justify-content: center;">
                <div style="margin: 0 20% 0 25%;display:flex; align-items: center; justify-content: center;">
                    <img style="width:20px; margin-right:10px" src='https://songbird21.ru/assets/telephone.png' alt="" />
                    <div>
                        <div style="margin-bottom: 7px; font-size: 14px;font-weight: 400; font-family:'Arial',sans-serif; color:#ffffff66;">Звоните по номеру</div>
                        <a style="font-size: 14px;font-weight: 400;color:white;" href='tel:${setting[0].phone.replace(/[\(|\)|_|\-|\+)]/g, '')}'>${setting[0].phone}</a>
                    </div>
                </div>
                <div style="display:flex; align-items: center; justify-content: center;">
                    <img style="width:20px; margin-right:10px" src='https://songbird21.ru/assets/geo.png' alt="" />
                    <div>
                        <div style="margin-bottom: 7px; font-size: 14px;font-weight: 400; font-family:'Arial',sans-serif; color:#ffffff66;">Мы находимся</div>
                        <div style="font-size: 14px;font-weight: 400;color:white;">${setting[0].address}</div>
                    </div>
                </div>
                </div>
            `
            })
            return info.messageId
        } catch (error) {
            return error;
        }
    }



    async send3(reciever, user, id) {
        console.log(reciever, user)
        const order = await Models.Order.findOne({ where: { id } })
        const status = await Models.OrderStatus.findOne({ where: { id: order.idStatus } })
        const setting = await Models.SettingSite.findAll()
        try {
            let info = await this.#transparter2.sendMail({
                from: {
                    name: 'Певчий Сластник',
                    address: 'order@songbird21.ru'
                },
                to: reciever,
                subject: `Ваш заказ № ${order.id} из songbird21.ru - Обновление статуса`,
                text: '',
                html: `
                <div style="padding:20px 10px; margin: 0 auto; width:60%; background: #cca275; display:flex; align-items: center; justify-content: center;">
                <img style="width:80px; margin: 0 15px 0 25%;" src='https://songbird21.ru/assets/logo-49XS5Dp5.png' alt="" />
                <div>
                    <div style="font-size:24px;color: #333333;font-family:'Arial',sans-serif; text-transform: uppercase;">Певчий сластник</div>
                    <div style="font-size:20px;color: #333333;font-family:'Arial',sans-serif; text-transform: uppercase;">Кондитерские изделия,торты</div>
                </div>
                </div>
                <div style="margin: 0 auto; width:60%; ">
                    <p style="text-align: left; margin:30px 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Уважаемый(-ая) ${user.name}</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Статус вашего заказа <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">№ ${order.id}</strong> из sonbird21.ru был обновлен.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;"> Статус вашего заказа: <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${status.statusText}</strong>.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Вы можете отслеживать статус вашего заказа по электронной почте или в <a style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;" href='https://songbird21.ru/personal-area/history-of-orders'>Личном кабинете.</a></p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Если у вас есть какие-либо вопросы, пожалуйста, не стесняйтесь обращаться к нам по электроной почте <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${setting[0].email}</strong> или телефону <strong style="font-size:16px;color:#333333; font-family:'Arial',sans-serif;">${setting[0].phone}</strong>.</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">С уважением,</p>
                    <p style="text-align: left; margin:0 0 0 25px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Команда songbird21.ru</p>
                </div>
                <div style="text-align: center; border-bottom:1px solid #333333; width: 100%;height: 10px;"></div>
                <div style="text-align: center; margin:13px 0 59px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">
                Примечание: это сообщение отправлено с электронного адреса, предназначенного только для рассылки исходящих
                электронных сообщений и не принимающего входящих электронных сообщений. Пожалуйста, не отвечайте на это
                сообщение. Если вы не регистрировались на, возможно, кто-то другой по ошибке указал ваш адрес электронной почты.
                <a style="text-decoration: none;border-bottom: 1px solid #333333; font-size:14px;color:#d2ab04; font-family:'Arial',sans-serif;"
                    href="https://songbird21.ru/account-deleting">Вы
                    можете удалить
                    аккаунт</a>
                </div>
                <div style="text-align: center; border-bottom:1px solid #333333; width: 100%;height: 10px;"></div>
                <div style="margin-top:25px;padding:20px 10px; margin: 0 auto; width:60%; background: #0a0905;  display:flex; align-items: center; justify-content: center;">
                <div style="margin: 0 20% 0 25%;display:flex; align-items: center; justify-content: center;">
                    <img style="width:20px; margin-right:10px" src='https://songbird21.ru/assets/telephone.png' alt="" />
                    <div>
                        <div style="margin-bottom: 7px; font-size: 14px;font-weight: 400; font-family:'Arial',sans-serif; color:#ffffff66;">Звоните по номеру</div>
                        <a style="font-size: 14px;font-weight: 400;color:white;" href='tel:${setting[0].phone.replace(/[\(|\)|_|\-|\+)]/g, '')}'>${setting[0].phone}</a>
                    </div>
                </div>
                <div style="display:flex; align-items: center; justify-content: center;">
                    <img style="width:20px; margin-right:10px" src='https://songbird21.ru/assets/geo.png' alt="" />
                    <div>
                        <div style="margin-bottom: 7px; font-size: 14px;font-weight: 400; font-family:'Arial',sans-serif; color:#ffffff66;">Мы находимся</div>
                        <div style="font-size: 14px;font-weight: 400;color:white;">${setting[0].address}</div>
                    </div>
                </div>
                </div>
            `
            })
            return info.messageId
        } catch (error) {
            return error;
        }
    }


    postEmail = async (req, res, next) => {

        try {
            const { email, message } = req.body
            console.log(email, message)
            console.log(this.send)
            let resd = await this.send(email, message);
            return res.json({ result: resd })
        } catch (error) {
            console.log(error)
        }

    }



    //postEmailOrder = async (req, res, next) => {

    //    try {
    //        const { email, message } = req.body
    //        let resd = await this.send(email, message);
    //        return res.json({ result: resd })
    //    } catch (error) {
    //        console.log(error)
    //    }

    //}


    async messageTelegram(req, res, next) {
        const { name, phone, text } = req.body;
        const txt = `<b>Имя:</b> ${name} <b>Телефон:</b> ${phone} <b>Сообщение:</b> ${text}`
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&parse_mode=html&text=${txt}`
        await axios.post(url)
            .then(() => {
                return res.json('Сообщение отправлено')
            })
            .catch(() => {
                return res.json('Ошибка отправки сообщения')
            })
    }

    async messageContactTelegram(req, res, next) {
        const { name, phone, email, text } = req.body;
        console.log(name, phone, email, text)
        const txt = `<b>Имя:</b> ${name} <b>Телефон:</b> ${phone}<b>Email:</b> ${email} <b>Сообщение:</b> ${text}`
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&parse_mode=html&text=${txt}`
        await axios.post(url)
            .then(() => {
                return res.json('Сообщение отправлено')
            })
            .catch(() => {
                return res.json('Ошибка отправки сообщения')
            })
    }


    async messageOrderTelegram(id) {
        const txt = `<b>Новый заказ на сайте №: </b> ${id}`
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&parse_mode=html&text=${txt}`
        console.log('sDDDDDSSSSSSSSSSSddddddd')
        await axios.post(url)
            .then(() => {
                console.log('Сообщение отправлено на телеграм')
            })
            .catch(() => {
                console.log('Ошибка отправки сообщения на телеграм')
            })
    }

    formatNumber(str) {
        if (+str <= 9) {
            return '0' + str
        } else {
            return str
        }
    }
}


export default new mailController();

















//Пример сообщения оповещения о заказе пользователю на электронную почту
//Тема: Ваш заказ № [номер заказа] из [название магазина]

//Уважаемый(ая) [имя пользователя],

//Благодарим вас за заказ в [название магазина]!

//Детали вашего заказа:

//Номер заказа: [номер заказа]
//Дата заказа: [дата заказа]
//Статус заказа: [статус заказа]
//Сумма заказа: [сумма заказа]
//Товары в заказе:

//[Список товаров с описанием, ценой и количеством]
//Доставка:

//Способ доставки: [способ доставки]
//Адрес доставки: [адрес доставки]
//Стоимость доставки: [стоимость доставки]
//Ожидаемая дата доставки: [ожидаемая дата доставки]
//Оплата:

//Способ оплаты: [способ оплаты]
//Статус оплаты: [статус оплаты]
//Для отслеживания вашего заказа, пожалуйста, перейдите по ссылке: [ссылка на отслеживание заказа]

//Если у вас есть какие-либо вопросы, пожалуйста, не стесняйтесь обращаться к нам по [адрес электронной почты] или [номер телефона].

//С уважением,

//Команда [название магазина]

//P.S. Не забудьте подписать сообщение своим именем или названием компании.

//Дополнительно:

//Вы можете добавить в сообщение логотип вашего магазина.
//Вы можете добавить в сообщение информацию о возврате товаров и гарантийном обслуживании.
//Вы можете предложить пользователю подписаться на рассылку новостей вашего магазина.
//Вы можете персонализировать сообщение, используя имя пользователя и историю его покупок.
//Надеюсь, этот пример поможет вам создать сообщение оповещения о заказе для ваших пользователей!

//Фото профиля
//Пример сообщения оповещение об изменении статуса заказа
//Показать черновики




































//Пример сообщения оповещения об изменении статуса заказа
//Тема: Ваш заказ № [номер заказа] из [название магазина] - Обновление статуса

//Уважаемый(ая) [имя пользователя],

//Мы рады сообщить вам, что статус вашего заказа № [номер заказа] из [название магазина] был обновлен.

//Новый статус вашего заказа: [новый статус заказа]

//Подробности изменения:

//[Описание изменения статуса]
//Для отслеживания вашего заказа, пожалуйста, перейдите по ссылке: [ссылка на отслеживание заказа]

//Если у вас есть какие-либо вопросы, пожалуйста, не стесняйтесь обращаться к нам по [адрес электронной почты] или [номер телефона].

//С уважением,

//Команда [название магазина]

//P.S. Не забудьте подписать сообщение своим именем или названием компании.

//Дополнительно:

//Вы можете добавить в сообщение информацию о том, что означает новый статус заказа.
//Вы можете добавить в сообщение информацию о том, что делать дальше.
//Вы можете предложить пользователю оставить отзыв о своем заказе.
//Вы можете персонализировать сообщение, используя имя пользователя и историю его покупок.
//Надеюсь, этот пример поможет вам создать сообщение оповещения об изменении статуса заказа для ваших пользователей!