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
            const { phone, address, instagram, youtube, telegram, vkontakte, email } = req.body;
            console.log(phone, address, instagram, youtube, telegram, vkontakte, email)
            const setting = await Models.SettingSite.findAll()
            console.log('sdsdfs', setting)
            if (setting.length > 0) {
                await Models.SettingSite.update({ phone, address, instagram, youtube, telegram, vkontakte, email }, { where: { id: 1 } })
            } else {
                await Models.SettingSite.create({ phone, address, instagram, youtube, telegram, vkontakte, email })
            }
            return res.json('Настройки измененны')
        } catch (error) {
            console.log('Ошибка изменения настроек')
        }
    }


    async getSettingSite(req, res, next) {
        try {
            const setting = await Models.SettingSite.findAll()
            console.log(setting)
            if (setting.length > 0) {
                return res.json(setting)
            } else {
                return res.json([{ phone: '79546543524', address: '', instagram: '', youtube: '', telegram: '', vkontakte: '', email: '' }])
            }
            return res.json(setting)

        } catch (error) {
            console.log('Ошибка получения настроек')
        }
    }
}


export default new settingController();