import ApiError from '../error/ApiError.js'
import Models from '../models/models.js'
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


class basketController {


    async addBasket(req, res, next) {
        try {
            const { idGoods, count } = req.body;
            const { id } = req.user;

            console.log(idGoods)
            const Basket = await Models.Basket.findAll({ where: { idUser: id } })
            console.log(Basket)

            //const goods = await Models.Goods.findOne({ where: { id: idGoods } })
            //if (Basket.length > 0) {
            //    let arr = JSON.parse(Basket[0].dataValues.lists);
            //    let arrr = arr.filter(e => e[idGoods] ? true : false)[0];
            //    if (arrr) arrr[idGoods] += 1;
            //    let res = arr.map(e => Object.keys(e)[0] === (idGoods).toString() ? arrr : e);
            //    let arr2 = JSON.stringify(res)
            //    await Models.Basket.update({ lists: arr2 }, { where: { idUser: id } })
            //    //await Models.Goods.update({ liked: goods.liked + 1 }, { where: { id: idGoods } })
            //} else {
            //    let arr = JSON.stringify([{ idGoods: 0 }])
            //    await Models.Basket.create({ idUser: id, lists: arr })
            //}

            if (Basket.length > 0) {
                let str = Basket[0].dataValues.lists;
                let lists = JSON.parse(str);
                let incldd = false;
                lists.forEach(e => { if (e.idGoods === idGoods) incldd = true });
                if (!incldd) lists.push({ idGoods, count })
                let arr = JSON.stringify(lists)
                await Models.Basket.update({ lists: arr }, { where: { idUser: id } })

            } else {
                let arr = JSON.stringify([{ idGoods, count }])
                await Models.Basket.create({ idUser: id, lists: arr })
            }

            return res.json('В корзину добавленно или измененно')
        } catch (error) {
            console.log('Ошибка добавленния или измененния корзины')
        }
    }



    async deleteBasket(req, res, next) {
        try {
            const { idGoods } = req.body;
            const { id } = req.user;

            console.log(idGoods)
            const Basket = await Models.Basket.findAll({ where: { idUser: id } })
            //const goods = await Models.Goods.findOne({ where: { id: idGoods } })

            //console.log('sdsdfs', Array.isArray(Basket))

            //if (Basket.length > 0) {
            //    let arr = JSON.parse(Basket[0].dataValues.lists);
            //    let arrr = arr.filter(e => e[idGoods] ? true : false)[0];
            //    if (arrr) arrr[idGoods] -= 1;
            //    let res = arr.map(e => Object.keys(e)[0] === (idGoods).toString() ? arrr : e);
            //    let arr2 = JSON.stringify(res)
            //    console.log(arr2);
            //    await Models.Basket.update({ lists: arr2 }, { where: { idUser: id } })
            //    //await Models.Goods.update({ liked: goods.liked - 1 }, { where: { id: idGoods } })

            //} else {
            //    return res.json('У вас пустая корзина')
            //}

            if (Basket.length > 0) {
                let str = Basket[0].dataValues.lists;
                let arr = JSON.parse(str);
                let lists = arr.filter(e => e.idGoods !== idGoods);
                let res = JSON.stringify(lists)
                await Models.Basket.update({ lists: res }, { where: { idUser: id } })
            } else {
                return res.json('У вас пустая корзина')
            }
            return res.json('Товар из корзины удален')
        } catch (error) {
            console.log('Ошибка удаления или измененния корзины')
        }
    }

    async getBasket(req, res, next) {
        try {
            //const { idUser } = req.body;
            const { id } = req.user;
            const Basket = await Models.Basket.findOne({ where: { idUser: id } })
            if (Basket) {
                return res.json(Basket)
            } else {
                return res.json({ lists: "[]" })

            }
        } catch (error) {
            console.log('Ошибка получения корзины')
        }
    }


    //async getBasket(req, res, next) {
    //    try {
    //        const { idUser } = req.body;
    //        console.log(idUser)
    //        const Basket = await Models.Basket.findOne({ where: { idUser } })
    //        console.log(Basket)
    //        if (Basket) {
    //            return res.json(Basket)
    //        } else {
    //            return res.json({ lists: "[]" })

    //        }
    //    } catch (error) {
    //        console.log(error, 'Ошибка получения избранного')
    //    }
    //}


    async getBasketGoods(req, res, next) {

        try {
            const { id } = req.user;
            const Basket = await Models.Basket.findOne({ where: { idUser: id } })
            if (Basket === null) {
                return res.json({ goods: [], list: [] })
            } else {
                let arr = JSON.parse(Basket.dataValues.lists);
                let ress = [];
                for (const iterator of arr) {
                    let godds = await Models.Goods.findOne({ where: { id: iterator.idGoods } });
                    let arrImg = JSON.parse(godds.imageURL)
                    godds.imageURL = arrImg;
                    ress.push(godds)
                }


                return res.json({ goods: ress, list: arr })
            }
        } catch (error) {
            console.log('Ошибка получения корзины')
        }
    }


}


export default new basketController();