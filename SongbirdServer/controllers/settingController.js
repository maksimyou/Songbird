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


class settingController {
    async addSettingSite(req, res, next) {
        try {
            const { phone, address, instagram, youtube, telegram, vkontakte, email, courier, pickup, cash, card } = req.body;
            console.log('asdasdasd22222222', phone, address, instagram, youtube, telegram, vkontakte, email, courier, pickup, cash, card)
            const setting = await Models.SettingSite.findAll()

            if (setting.length > 0) {

                await Models.SettingSite.update({ phone, address, instagram, youtube, telegram, vkontakte, email }, { where: { id: 1 } })
                await Models.Delivery.update({ courier, pickup }, { where: { id: 1 } })
                await Models.PaymentMethod.update({ cash, card }, { where: { id: 1 } })


            } else {
                await Models.SettingSite.create({ phone, address, instagram, youtube, telegram, vkontakte, email })
                await Models.Delivery.create({ courier, pickup })
                await Models.PaymentMethod.create({ cash, card })

            }
            return res.json('Настройки измененны')
        } catch (error) {
            console.log('Ошибка изменения настроек')
        }
    }


    async getSettingSite(req, res, next) {
        try {
            const setting = await Models.SettingSite.findAll()
            const delivery = await Models.Delivery.findAll()
            const payment = await Models.PaymentMethod.findAll()

            console.log(setting, delivery)


            if (setting.length > 0) {
                const setting2 = Object.assign(setting[0].dataValues, delivery[0].dataValues, payment[0].dataValues)
                console.log(setting2)

                return res.json([setting2])
            } else {
                return res.json([{ phone: '79546543524', address: '', instagram: '', youtube: '', telegram: '', vkontakte: '', email: '', courier: false, pickup: false, cash: false, card: false }])
            }

            return res.json(setting)

        } catch (error) {
            console.log('Ошибка получения настроек')
        }
    }
}


export default new settingController();