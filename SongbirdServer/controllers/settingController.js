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




    async addSettingHome(req, res, next) {
        try {
            const { title, description, comment, buttonNames, background } = req.body;
            console.log(title, description, comment, buttonNames, background)
            const setting = await Models.SettingHome.findAll()

            if (setting.length > 0) {
                await Models.SettingHome.update({ title, description, comment, buttonNames, background }, { where: { id: 1 } })
            } else {
                await Models.SettingHome.create({ title, description, comment, buttonNames, background })

            }
            return res.json('Настройки главной страницы измененны')
        } catch (error) {
            console.log('Ошибка изменения настроек главной страницы')
        }
    }




    async getSettingHome(req, res, next) {
        try {
            const setting = await Models.SettingHome.findAll()
            if (setting.length > 0) {
                return res.json(setting)
            } else {
                return res.json([{ title: '', description: '', comment: '', buttonNames: '', background: '' }])
            }
        } catch (error) {
            console.log('Ошибка получения настроек главной страницы')
        }
    }



    async addSettingBonuses(req, res, next) {
        try {
            const { list } = req.body;
            console.log(list)
            let jsonList = JSON.stringify(list)
            const setting = await Models.SettingBonuses.findAll()

            if (setting.length > 0) {
                await Models.SettingBonuses.update({ list: jsonList }, { where: { id: 1 } })
            } else {
                await Models.SettingBonuses.create({ list: jsonList })

            }
            return res.json('Настройки бонусов измененны')
        } catch (error) {
            console.log('Ошибка изменения настроек бонусов')
        }
    }


    async getSettingBonuses(req, res, next) {
        try {
            const setting = await Models.SettingBonuses.findAll()
            if (setting.length > 0) {
                return res.json(setting)
            } else {
                const bonuses = [
                    {
                        id: 0,
                        text: 'За сумму от 500 руб до 1499 руб',
                        min: 500,
                        max: 1499,
                        percent: 2
                    },
                    {
                        id: 1,
                        text: 'За сумму от 1500 руб до 2999 руб',
                        min: 1500,
                        max: 2999,
                        percent: 3
                    },
                    {
                        id: 2,
                        text: 'За сумму от 3000 руб до 4999 руб',
                        min: 3000,
                        max: 4999,
                        percent: 4
                    },
                    {
                        id: 3,
                        text: 'За сумму от 5000 руб и более руб',
                        min: 5000,
                        max: 9999999,
                        percent: 5
                    },
                ]
                let jsonArr = JSON.stringify(bonuses)
                return res.json([{ list: jsonArr }])
            }
        } catch (error) {
            console.log('Ошибка получения настроек бонусов')
        }
    }

}


export default new settingController();