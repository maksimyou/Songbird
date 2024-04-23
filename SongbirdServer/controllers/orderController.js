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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config()


class orderController {
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
        try {
            let basket = await Models.Basket.findOne({ where: { idUser: id } })
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
            let chargedBonuses = Math.floor(sum / 500) * 20
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

        try {
            let orders = await Models.Order.findAll({ where: { idUser: id } })

            let newOrders = [];
            for (let i = 0; i < orders.length; i++) {
                let user = await Models.User.findOne({ where: { id: orders[i].idUser } })

                let list = JSON.parse(orders[i].dataValues.list)
                let listArr = [];

                for (let j = 0; j < list.length; j++) {

                    let good = await Models.Goods.findOne({ where: { id: list[j].idGoods } })
                    let obj = Object.assign(list[j], { name: good.name, quantity: good.quantity, price: good.price, imageURL: JSON.parse(good.imageURL) });

                    listArr.push(obj)
                }
                let obj = Object.assign({ email: user.email, phone: user.phone, name: user.name }, orders[i].dataValues, { list: listArr });
                console.log(obj)
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

}


export default new orderController();