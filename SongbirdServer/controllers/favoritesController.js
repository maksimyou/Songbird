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


class favoritesController {


    async addFavorites(req, res, next) {
        try {
            const { idGoods } = req.body;
            const { id } = req.user;

            console.log(idGoods)
            const favorites = await Models.Favorites.findAll({ where: { idUser: id } })
            const goods = await Models.Goods.findOne({ where: { id: idGoods } })

            if (favorites.length > 0) {
                let arr = JSON.parse(favorites[0].dataValues.lists);

                arr.push(idGoods);
                let arr2 = JSON.stringify(arr)
                await Models.Favorites.update({ lists: arr2 }, { where: { idUser: id } })
                await Models.Goods.update({ liked: goods.liked + 1 }, { where: { id: idGoods } })

            } else {
                let arr = JSON.stringify([idGoods])
                await Models.Favorites.create({ idUser: id, lists: arr })
            }
            return res.json('Избранное добавленно или измененно')
        } catch (error) {
            console.log('Ошибка добавленния или измененния избранного')
        }
    }



    async deleteFavorites(req, res, next) {
        try {
            const { idGoods } = req.body;
            const { id } = req.user;

            console.log(idGoods)
            const favorites = await Models.Favorites.findAll({ where: { idUser: id } })
            const goods = await Models.Goods.findOne({ where: { id: idGoods } })
            if (favorites.length > 0) {
                let arr = JSON.parse(favorites[0].dataValues.lists);
                let arr2 = arr.filter(e => { return e !== idGoods });
                let arr3 = JSON.stringify(arr2)
                console.log(arr2);
                await Models.Favorites.update({ lists: arr3 }, { where: { idUser: id } })
                if (goods.liked >= 1) await Models.Goods.update({ liked: goods.liked - 1 }, { where: { id: idGoods } })
            } else {
                return res.json('У вас нет избранных товаров')
            }
            return res.json('Избранное удалено')
        } catch (error) {
            console.log('Ошибка добавленния или измененния избранного')
        }
    }

    async getFavorites(req, res, next) {
        try {
            //const { idUser } = req.body;
            const { id } = req.user;

            console.log(id)
            const favorites = await Models.Favorites.findOne({ where: { idUser: id } })
            console.log(favorites)
            if (favorites) {
                return res.json(favorites)
            } else {
                return res.json({ lists: "[]" })

            }
        } catch (error) {
            console.log('Ошибка получения избранного')
        }
    }


    //async getFavorites(req, res, next) {
    //    try {
    //        const { idUser } = req.body;
    //        console.log(idUser)
    //        const favorites = await Models.Favorites.findOne({ where: { idUser } })
    //        console.log(favorites)
    //        if (favorites) {
    //            return res.json(favorites)
    //        } else {
    //            return res.json({ lists: "[]" })

    //        }
    //    } catch (error) {
    //        console.log(error, 'Ошибка получения избранного')
    //    }
    //}


    async getFavoritesGoods(req, res, next) {

        try {
            const { id } = req.user;
            const favorites = await Models.Favorites.findOne({ where: { idUser: id } })
            if (favorites === null) {
                return res.json([])
            } else {
                let arr = JSON.parse(favorites.dataValues.lists);
                let ress = [];
                for (const iterator of arr) {
                    let godds = await Models.Goods.findOne({ where: { id: iterator } });
                    let arrImg = JSON.parse(godds.imageURL)
                    godds.imageURL = arrImg;
                    ress.push(godds)
                }
                return res.json(ress)
            }
        } catch (error) {
            console.log('Ошибка получения избранного')
        }
    }


}


export default new favoritesController();