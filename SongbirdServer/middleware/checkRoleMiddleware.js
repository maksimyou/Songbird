import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export default function (role) {

    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            console.log(req.body)
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded)
            if (decoded.role !== role) {
                return res.status(403).json({ message: "Нет доступа" })


            }
            console.log('sdfsdfsdfsdfsdfsdf', decoded)
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({ message: "Не авторизован" })
        }
    }
}







