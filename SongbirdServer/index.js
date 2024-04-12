import express from 'express'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import sequelize from './db.js'
import Models from './models/models.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import https from 'https'
import fs from 'fs'
config()
const PORT = process.env.PORT || 5000;
const app = express()


//const httpsOptions = {
//    key: fs.readFileSync("../../etc/ssl/songbird21.key"), // путь к ключу
//    cert: fs.readFileSync("../../etc/ssl/songbird21.crt") // путь к сертификату
//}




app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload())
app.use('/api', router)
//Обработка ошибок, последний Middleware
app.use(errorHandler)


app.get('/', (req, res) => {
    res.status(200).json({ maessage: 'WORKING!!!!' })
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync() //{ force: true }
        //удаление всех таблиц
        //await sequelize.dropAllSchemas()
        //await sequelize.drop()
        //https.createServer(httpsOptions, app).listen(443, () => console.log(`Server started on port ${PORT}`))
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))







        let status = await Models.OrderStatus.findAll()
        if (status.length === 0) {
            await Models.OrderStatus.create({ statusText: 'Новый' })
            await Models.OrderStatus.create({ statusText: 'В обработке' })
            await Models.OrderStatus.create({ statusText: 'Ожидает оплаты' })
            await Models.OrderStatus.create({ statusText: 'Отправлен' })
            await Models.OrderStatus.create({ statusText: 'Доставлен' })
            await Models.OrderStatus.create({ statusText: 'Отменен' })
        }
    } catch (error) {
        console.log(error)
    }
}


start()

