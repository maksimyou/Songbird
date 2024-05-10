import ApiError from '../error/ApiError.js'
import Models from '../models/models.js'
import mailController from './mailController.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import path from 'path'
import { v4 } from 'uuid'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from 'console'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config()


class orderController {
    constructor(name) {
        this.name = name;
    }
    //status = ["Заказ оформлен", "Доставка заказа", "Отмена заказа", "Заказ доставлен"]

    //async addOrderStatus(req, res, next) {
    //    try {
    //        for (let i = 0; i < this.status.length; i++) {
    //            await Models.OrderStatus.create({ statusText: this.status[i] })
    //        }
    //        return res.json('Статусы заказа добавленны')
    //    } catch (error) {
    //        console.log('Ошибка добавления статусов')
    //    }
    //}

    //Math.floor(sumBaske / 500) * 20

    //const sumBasketGoods = (data) => {
    //    let sum = 0;
    //    data.goods.forEach((e, i) => { sum += data.list[i].count * e.price })
    //    setSumBaske(sum)
    //  }




    async addOrder(req, res, next) {
        const { name, phone, adress, paymentMethod, paymentBonus, typeDelivery, coordination, noPayment } = req.body;
        const { id } = req.user;
        const countingBonuses = (sumBaske, isSettingBonuses) => {
            console.log(sumBaske, isSettingBonuses);
            if (isSettingBonuses[0].min > sumBaske) {
                return 0
            } else if (isSettingBonuses[0].min <= sumBaske && isSettingBonuses[0].max >= sumBaske) {
                return Math.floor(sumBaske / 100) * isSettingBonuses[0].percent
            } else if (isSettingBonuses[1].min <= sumBaske && isSettingBonuses[1].max >= sumBaske) {
                return Math.floor(sumBaske / 100) * isSettingBonuses[1].percent
            } else if (isSettingBonuses[2].min <= sumBaske && isSettingBonuses[2].max >= sumBaske) {
                return Math.floor(sumBaske / 100) * isSettingBonuses[2].percent
            } else if (isSettingBonuses[3].min <= sumBaske && isSettingBonuses[3].max >= sumBaske) {
                return Math.floor(sumBaske / 100) * isSettingBonuses[3].percent
            }
        }

        try {
            let basket = await Models.Basket.findOne({ where: { idUser: id } })

            let bonuses = await Models.SettingBonuses.findOne({ where: { id: 1 } })

            let arrList = JSON.parse(bonuses.dataValues.list)

            let user = await Models.User.findOne({ where: { id: id } })
            await Models.User.update({ name: name, phone: phone }, { where: { id: id } })
            let bonus = user.bonusAccount - paymentBonus;
            let lists = JSON.parse(basket.lists)
            let sum = 0;
            for (let i = 0; i < lists.length; i++) {
                let goods = await Models.Goods.findOne({ where: { id: lists[i].idGoods } })
                console.log(lists[i].count, goods.price)
                sum += (lists[i].count * goods.price)
            }

            let chargedBonuses = countingBonuses(sum, arrList)

            let method = '';
            let delivery = '';
            let pay = 0;
            let adressJson = JSON.stringify(adress);
            if (paymentMethod) {
                method = 'Наличными'
            } else {
                method = 'Картой онлайн'
            }
            if (typeDelivery) {
                //sum += 450
                delivery = 'Самовывоз'
            } else {
                delivery = 'Курьер'
            }
            if (bonus >= 0) {
                pay = Number(paymentBonus)
            }
            let orrder = await Models.Order.create({ priceGoods: sum, idUser: id, list: basket.lists, adress: adressJson, paymentMethod: method, typeDelivery: delivery, chargedBonuses, paymentBonus: pay, coordination, noPayment })
            await Models.Basket.destroy({ where: { idUser: id } })
            await mailController.send2(user.email, orrder.id)
            await mailController.messageOrderTelegram(orrder.id)
            return res.json(orrder)
        } catch (error) {
            console.log('Ошибка добавления заказа')
        }
    }


    async addStatus(req, res, next) {
        const { statusText } = req.body;

        try {
            await Models.OrderStatus.create({ statusText })
            return res.json('Статус добавлен')
        } catch (error) {
            console.log('Ошибка добавления статуса')
        }
    }


    async getOrders(req, res, next) {
        //const { id } = req.user;

        try {
            let orders = await Models.Order.findAll()
            console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP', orders)
            let newOrders = [];
            for (let i = 0; i < orders.length; i++) {
                let user = await Models.User.findOne({ where: { id: orders[i].idUser } })
                let adress = JSON.parse(orders[i].dataValues.adress)

                let list = JSON.parse(orders[i].dataValues.list)
                let listArr = [];

                for (let j = 0; j < list.length; j++) {
                    console.log(4596)

                    let good = await Models.Goods.findOne({ where: { id: list[j].idGoods } })
                    let obj = Object.assign(list[j], { name: good.name, quantity: good.quantity, price: good.price, imageURL: JSON.parse(good.imageURL) });

                    listArr.push(obj)
                }
                let obj = Object.assign({ email: user.email, phone: user.phone, name: user.name }, orders[i].dataValues, { adress, list: listArr });
                console.log(obj)
                newOrders.push(obj)
            }
            return res.json(newOrders)

        } catch (error) {
            console.log('Ошибка получения всех заказов')
        }
    }


    async getOrder(req, res, next) {
        const { id } = req.user;
        console.log('0', 'HELPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP')

        try {
            let orders = await Models.Order.findAll({ where: { idUser: id } })
            let newOrders = [];
            for (let i = 0; i < orders.length; i++) {
                let user = await Models.User.findOne({ where: { id: orders[i].dataValues.idUser } })
                user = user.dataValues
                let list = JSON.parse(orders[i].dataValues.list)

                let listArr = [];
                for (let j = 0; j < list.length; j++) {
                    let goodss = await Models.Goods.findAll()

                    let good = await Models.Goods.findOne({ where: { id: list[j].idGoods } })

                    let obj = Object.assign(list[j], { name: good.name, quantity: good.quantity, price: good.price, imageURL: JSON.parse(good.imageURL) });
                    listArr.push(obj)
                }

                let obj = Object.assign({ email: user.email, phone: user.phone, name: user.name }, orders[i].dataValues, { list: listArr });

                newOrders.push(obj)
            }

            return res.json(newOrders)

        } catch (error) {
            console.log('Ошибка получения заказов пользователя')
        }
    }



    async setStatuesOrder(req, res, next) {
        const { idStatus, idOrder } = req.body;
        const { id } = req.user;
        let user = await Models.User.findOne({ where: { id: id } })
        try {
            if (Number(idStatus) === 5) {
                let order = await Models.Order.findOne({ where: { id: idOrder } })
                let sum = (user.bonusAccount - order.paymentBonus) + order.chargedBonuses
                await Models.User.update({ bonusAccount: sum }, { where: { id: id } })
                await mailController.send3(user.email, user, idOrder)
            }
            await Models.Order.update({ idStatus }, { where: { id: idOrder } })
            await mailController.send3(user.email, user, idOrder)
            return res.json("Статус заказа изменен")
        } catch (error) {
            console.log('Ошибка установки статуса заказа')
        }
    }


    async deleteOrder() {
        //    ## Логика удаления аккаунта с сайта

        //Логика удаления аккаунта с сайта обычно включает в себя комбинацию фронтэнд - и бэкэнд - процессов, чтобы обеспечить безопасное и контролируемое удаление аккаунта.Вот общий обзор основных этапов:

        //** Фронтэнд:**

        //            1. ** Инициирование запроса пользователя:** Пользователь начинает процесс удаления аккаунта, нажимая на кнопку "Удалить аккаунт" или соответствующую опцию в настройках своего аккаунта.

        //2. ** Подтверждение личности пользователя:** Чтобы предотвратить несанкционированное удаление аккаунтов, реализуйте шаг проверки для подтверждения личности пользователя.Это может включать:

        //    - ** Подтверждение пароля:** Запросите пользователя ввести пароль от своего аккаунта.
        //    - ** Подтверждение по электронной почте:** Отправьте электронное письмо с подтверждением на адрес электронной почты пользователя, зарегистрированный в аккаунте, с уникальной ссылкой.

        //3. ** Подтверждение намерения:** После подтверждения личности пользователя попросите его подтвердить намерение продолжить удаление аккаунта.Это может быть всплывающее сообщение или флажок, требующий явного подтверждения.

        //** Бэкэнд:**

        //            1. ** Получение запроса на удаление:** Бэкэнд - сервер получает запрос на удаление с фронтэнда вместе с учетными данными пользователя для проверки(пароль или ссылка подтверждения).

        //2. ** Проверка личности пользователя:** Проверьте личность пользователя на основании предоставленных учетных данных.Если учетные данные недействительны, отклоните запрос на удаление и сообщите об этом пользователю.

        //3. ** Обработка удаления аккаунта:** Если учетные данные действительны, продолжите процесс удаления аккаунта:

        //    - ** Пометьте аккаунт как неактивный:** Обновите статус аккаунта пользователя в базе данных, чтобы указать, что аккаунт помечен на удаление.Это предотвращает дальнейшие входы в систему или использование аккаунта.

        //    - ** Запланируйте фоновое удаление:** Инициируйте фоновый процесс или задачу для обработки фактического удаления пользовательских данных.Это может включать:
        //        - ** Удаление пользовательских данных:** Удалите профиль пользователя, связанную информацию и любой контент, который он создал.
        //        - ** Анонимизация или удаление личных данных:** В зависимости от правил конфиденциальности данных анонимизируйте или надежно удалите любую персонально идентифицируемую информацию(PII), связанную с пользователем.

        //    - ** Запись информации об удалении:** Запишите событие удаления аккаунта в журнал аудита для отслеживания и соблюдения требований.

        //4. ** Уведомите пользователя:** Отправьте пользователю уведомление, подтверждающее успешное удаление его аккаунта.Это может быть электронное письмо или сообщение на сайте.

        //** Дополнительные соображения:**

        //- ** Период ожидания:** Рассмотрите возможность реализации периода ожидания, в течение которого пользователь может повторно активировать свой аккаунт, если он сделал запрос по ошибке.

        //- ** Политики хранения данных:** Соблюдайте соответствующие политики и правила хранения данных, касающиеся хранения и удаления пользовательских данных.

        //- ** Резервное копирование данных:** Обеспечьте регулярное резервное копирование данных, чтобы предотвратить случайную потерю данных во время процесса удаления.

        //- ** Безопасность:** Реализуйте надежные меры безопасности для защиты пользовательских данных и предотвращения несанкционированного удаления аккаунтов.

        //Следуя этим шагам и учитывая дополнительные аспекты, вы можете реализовать на своем сайте безопасный и удобный для пользователей процесс удаления аккаунта.
    }
}


export default new orderController();