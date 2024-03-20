import ApiError from '../error/ApiError.js'
import Models from '../models/models.js'
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
    status = ["Заказ оформлен", "Доставка заказа", "Отмена заказа", "Заказ доставлен"]

    async addOrderStatus(req, res, next) {
        try {
            for (let i = 0; i < this.status.length; i++) {
                await Models.OrderStatus.create({ statusText: this.status[i] })
            }
            return res.json('Статусы заказа добавленны')
        } catch (error) {
            console.log('Ошибка добавления статусов')
        }
    }

    async addOrder(req, res, next) {
        const { idGoods } = req.body;
        const { id } = req.user;

        try {
            let user = await Models.User.findOne({ where: { id: id } })
            let basket = await Models.Basket.findOne({ where: { idUser: id } })
            //let status = await Models.OrderStatus.findOne({ where: { idUser: id } })
            await Models.Order.create({ idUser: id, list: basket.lists })
            await Models.Basket.destroy({ where: { idUser: id } })
            return res.json('Заказ добавлен')
        } catch (error) {
            console.log('Ошибка добавления заказа')
        }
    }


    async getOrders(req, res, next) {
        const { id } = req.user;

        try {
            let orders = await Models.Order.findAll()
            let newOrders = [];
            for (let i = 0; i < orders.length; i++) {
                let { email, phone, adress, name } = await Models.User.findOne({ where: { id: id } })
                let obj = Object.assign({ email, phone, adress, name }, orders[i]);
                newOrders.push(obj)
            }
            //let status = await Models.OrderStatus.findOne({ where: { idUser: id } })
            //await Models.Order.create({ idUser: id, list: basket.lists })

            //console.log('Заказ отправлен')
            return res.json(newOrders)

        } catch (error) {
            console.log('Ошибка оправки заказов')
        }
    }

    async setStatuesOrder(req, res, next) {
        const { idStatus, idOrder } = req.body;
        try {
            await Models.Order.update({ idStatus }, { where: { id: idOrder } })
            return res.json("Статус заказа изменен")
        } catch (error) {
            console.log('Ошибка установки статуса заказа')
        }
    }

}


export default new orderController();