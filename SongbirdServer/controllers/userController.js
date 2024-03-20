import ApiError from '../error/ApiError.js'
import Models from '../models/models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import mailController from './mailController.js'
config()


const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}


class userController {

    async registration(req, res, next) {
        const { name, password, email } = req.body
        console.log(name, password, email)

        if (!email || !password) {
            return next(ApiError.badRequest('Некоректный email или  password'))
        }

        const candidate1 = await Models.User.findOne({ where: { email } })
        if (candidate1) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        //const candidate2 = await Models.User.findOne({ where: { login } })
        //if (candidate2) {
        //    return next(ApiError.badRequest('Пользователь с таким login`ом уже существует'))
        //}
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Models.User.create({ email, password: hashPassword, name })
        const code = Math.floor(10000 + Math.random() * 99999)
        mailController.send(email, `${code}`)
        await Models.ConfirmeCode.create({ userId: user.id, code: code })
        //console.log(user)
        //const token = generateJwt(user.id, user.email, user.role)
        return res.json({ id: user.id })
    }


    async generationCodeChecks(req, res, next) {
        const { id } = req.body;
        try {
            const user = await Models.User.findOne({ where: { id } })
            console.log(user)

            const code = Math.floor(10000 + Math.random() * 99999)
            mailController.send(user.email, `${code}`)
            console.log('sdsLKJK')
            const asd = await Models.ConfirmeCode.create({ userId: user.id, code: Number(code) })
            console.log(user.id, code, asd)
            return res.json('Код отправлен')
        } catch (error) {
            return res.json('Ошибка отправки кода')
        }
    }


    async login(req, res, next) {
        const { password, email } = req.body
        const user = await Models.User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal("Указан неверный логин или пароль"))
            //return next(ApiError.internal("Пользователь с таким email не существует"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный логин или пароль"))
            //return next(ApiError.internal("Указан неверный пароль"))

        }
        if (!user.confirmed) {
            return res.json({ confir: true, id: user.id, message: "Профиль не подтвержден" })
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })

    }


    async registrationAdmin(req, res, next) {
        const { name, password, email, role, confirmed } = req.body;
        console.log(name, password, email, role)
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Models.User.create({ email, password: hashPassword, name, role, confirmed })
        await Models.Notifications.create({ userId: 1, sms: false, email: false })

        //console.log(user)
        const token = generateJwt(user.id, user.email, user.role)
        return res.json('Админ зарегистрировался')
    }


    async cleaningUnconfirmedUsers(req, res, next) {


    }


    async editUserRole(req, res, next) {
        try {
            const { id, role } = req.body
            await Models.User.update({ role: role }, { where: { id: id } });
            return res.json(`Роль пользователя c id ${id} изменен`)
        } catch (error) {
            return next(ApiError.internal("Ошибка обновления роли пользователя"))

        }

    }


    async editUserData(req, res, next) {

        try {
            const { name, phone, birthday, email, adress, notifications } = req.body;
            const { id } = req.user;
            const notific = JSON.parse(notifications);
            await Models.User.update({ name, phone, birthday, email, adress }, { where: { id: id } });
            await Models.Notifications.update({ sms: notific.sms, email: notific.email }, { where: { userId: id } });
            return res.json(`Данные пользователя c id ${id} изменены`)
        } catch (error) {
            return next(ApiError.internal("Ошибка обновления данных пользователя"))
        }
    }


    async postConfirmation(req, res, next) {
        let { code, id } = req.body
        try {
            const codesUser = await Models.ConfirmeCode.findAll({ where: { userId: id } })
            let arrCode = codesUser.map(e => e.code)
            if (arrCode.includes(Number(code))) {
                await Models.User.update({ confirmed: true }, { where: { id: id } })
                await Models.Notifications.create({ userId: id, sms: false, email: false })
                const user = await Models.User.findOne({ where: { id: id } })
                const token = generateJwt(user.id, user.email, user.role)
                return res.json({ token })
            }
            return next(ApiError.badRequest('Введеный код не совпадает'))

        } catch (error) {
            return res.json(error, 'Ошибка подверждения кода')
        }
    }


    async installRole(req, res, next) {
        try {
            const { id, role } = req.body
            await Models.User.update({ role }, { where: { id: id } })
            return res.json(`Роль изменена на ${role}`)
        } catch (error) {
            console.log('Ошибка изменения роли пользователя')
        }
    }

    //async registrationStepEmail(req, res, next) {
    //    const { email } = req.body
    //    const candidate1 = await Models.User.findOne({ where: { email } })
    //    if (candidate1) {
    //        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    //    }
    //    return res.json('ok')
    //}

    //async registrationStepLogin(req, res, next) {
    //    const { login } = req.body
    //    const candidate2 = await Models.User.findOne({ where: { login } })
    //    if (candidate2) {
    //        return next(ApiError.badRequest('Пользователь с таким login`ом уже существует'))
    //    }
    //    return res.json('ok')
    //}




    async check(req, res, next) {
        console.log(req)
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }


    async getFirstName(req, res, next) {
        console.log(req)
        const email = req.user.email;
        const user = await Models.User.findOne({ where: { email } })
        if (user) {
            return res.json({ name: user.name })
        } else {
            return next(ApiError.internal("Не прошел проверку"))
        }
    }


    async getRole(req, res, next) {
        console.log(req)
        const email = req.user.email;
        const user = await Models.User.findOne({ where: { email } })
        if (user) {
            return res.json({ role: user.role })
        } else {
            return next(ApiError.internal("Не прошел проверку"))
        }
    }


    async getUsers(req, res, next) {
        console.log(req)
        const usersA = await Models.User.findAll({ where: { role: 'ADMIN' } })
        const usersM = await Models.User.findAll({ where: { role: 'MODERATOR' } })
        const usersU = await Models.User.findAll({ where: { role: 'USER' } })
        let usersArr = [].concat(usersA, usersM, usersU)
        if (usersArr) {
            return res.json(usersArr)
        } else {
            return next(ApiError.internal("Ошибка получения пользователей"))
        }
    }


    async getUserData(req, res, next) {

        const { id } = req.user
        const notific = await Models.Notifications.findOne({ where: { userId: id } })

        const { email, phone, birthday, adress, name } = await Models.User.findOne({ where: { id: id } })

        if (email) {
            return res.json({ email, phone, birthday, adress, name, notific })
        } else {
            return next(ApiError.internal("Ошибка получения пользователя"))
        }
    }

    async getUsersId(req, res, next) {

        const user = req.user;
        console.log(user, 'sdfsfs')
        if (user) {
            return res.json(user.id)
        } else {
            return next(ApiError.internal("Ошибка получении id пользователя"))
        }
    }


    async deleteUser(req, res, next) {
        try {
            const { id } = req.body
            await Models.User.destroy({
                where: { id }
            });
            return res.json(`Пользователь c id ${id} удален`)
        } catch (error) {
            return next(ApiError.internal("Ошибка удаления пользователя"))

        }
    }



}
export default new userController()

