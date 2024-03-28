import dotenv from 'dotenv'
import Models from '../models/models.js'
import nodemailer from 'nodemailer'
dotenv.config()
import axios from 'axios'
const { EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;
class mailController {
    #transparter = null;


    constructor() {
        this.#transparter = this.#getTransporter()
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
                <div style="text-align: center; margin-bottom: 67px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">Пожалуйста,
                    подтвердите свой адрес
                    электронной почты, чтобы завершить регистрацию.</div>
                <div style="text-align: center; border-bottom:1px solid #333333; width: 100%;height: 10px;"></div>
                <div style="text-align: center; margin:13px 0 59px; font-size:14px;color:#888888; font-family:'Arial',sans-serif;">
                    Примечание: это сообщение отправлено с электронного адреса, предназначенного только для рассылки исходящих
                    электронных сообщений и не принимающего входящих электронных сообщений. Пожалуйста, не отвечайте на это
                    сообщение. Если вы не регистрировались на, возможно, кто-то другой по ошибке указал ваш адрес электронной почты.
                    <a style="text-decoration: none;border-bottom: 1px solid #333333; font-size:14px;color:#d2ab04; font-family:'Arial',sans-serif;"
                        href="">Вы
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



}


export default new mailController();