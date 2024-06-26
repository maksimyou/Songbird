import ApiError from '../error/ApiError.js'
import fs from 'fs'
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


class goodsController {


    async addGoods(req, res, next) {
        try {
            const { name, price, category, description, composition, quantity } = req.body;
            const files = req.files
            console.log(name, price, category, files.files.length)
            let imgArrUrl = [];
            if (files.files.length) {
                for (let index = 0; index < files.files.length; index++) {
                    let fileName = v4() + '.png'
                    files.files[index].mv(path.resolve(__dirname, '..', 'static/img', fileName))
                    imgArrUrl.push(fileName)
                }
                let imageJson = JSON.stringify(imgArrUrl)
                const likedNumber = Math.floor(49 + Math.random() * 199)
                const boughtNumber = Math.floor(39 + Math.random() * 149)
                await Models.Goods.create({ liked: likedNumber, bought: boughtNumber, name, price, category, imageURL: imageJson, description, composition, quantity })
            } else {
                let fileName = v4() + '.png'
                files.files.mv(path.resolve(__dirname, '..', 'static/img', fileName))
                let imageJson = JSON.stringify([fileName])
                const likedNumber = Math.floor(49 + Math.random() * 199)
                const boughtNumber = Math.floor(39 + Math.random() * 149)
                await Models.Goods.create({ liked: likedNumber, bought: boughtNumber, name, price, category, imageURL: imageJson, description, composition, quantity })
            }

            return res.json('Товар добавлен')
        } catch (error) {
            console.log('Ошибка добавления')
        }
    }

    async getCategoryGoods(req, res, next) {
        try {
            const { category } = req.body;
            console.log(category)
            if (category === 'all') {
                const goods = await Models.Goods.findAll()
                for (let i = 0; i < goods.length; i++) {
                    let arrImg = JSON.parse(goods[i].imageURL)
                    goods[i].imageURL = arrImg;
                }
                return res.json(goods)
            } else {
                const goods = await Models.Goods.findAll({ where: { category } })
                const goods2 = goods.sort((a, b) => a.id - b.id)
                for (let i = 0; i < goods2.length; i++) {
                    let arrImg = JSON.parse(goods2[i].imageURL)
                    goods2[i].imageURL = arrImg;
                }
                return res.json(goods2)
            }

        } catch (error) {
            console.log('Ошибка получения товаров по категории')
        }
    }


    async getCategoryList(req, res, next) {
        try {
            const category = await Models.Сategory.findAll()
            return res.json(category)
        } catch (error) {
            console.log('Ошибка получения категорий')
        }
    }


    async setCategory(req, res, next) {
        const { name } = req.body;
        const { files } = req.files;

        console.log('ыыыыыыыыыыыыы', files)

        function translit(str) {
            const cyrToLatMap = {
                а: 'a',
                б: 'b',
                в: 'v',
                г: 'g',
                д: 'd',
                е: 'e',
                ё: 'yo',
                ж: 'zh',
                з: 'z',
                и: 'i',
                й: 'y',
                к: 'k',
                л: 'l',
                м: 'm',
                н: 'n',
                о: 'o',
                п: 'p',
                р: 'r',
                с: 's',
                т: 't',
                у: 'u',
                ф: 'f',
                х: 'kh',
                ц: 'ts',
                ч: 'ch',
                ш: 'sh',
                щ: 'shch',
                ъ: '',
                ы: 'y',
                ь: '',
                э: 'e',
                ю: 'yu',
                я: 'ya',
            };

            return name.split('').map(char => {
                const lowerCaseChar = char.toLowerCase();
                return cyrToLatMap[lowerCaseChar] || '';
            }).join('');
        }

        try {
            //fs.mkdir('new_folder', err => {
            //    if (err) throw err; // не удалось создать папку
            //    console.log('Папка успешно создана');
            //});
            let fileName = v4() + '.png'
            files.mv(path.resolve(__dirname, '..', 'static/img', fileName))
            await Models.Сategory.create({ route: translit(name), name, image: fileName })
            return res.json('Категория создана')
        } catch (error) {
            console.log('Ошибка создана категории')
        }
    }

    async editCategory(req, res, next) {
        const { route, name, id, filess } = req.body;
        console.log(route, name, id, filess)
        let categ = await Models.Сategory.findOne({ where: { id: id } })
        console.log(typeof filess);
        try {
            if (filess === 'false') {
                const { files } = req.files;
                console.log('файл: ', files)
                if (categ.image !== null) {
                    fs.unlink(path.resolve(__dirname, '..', 'static/img', categ.image), err => {
                        if (err) throw err; // не удалось удалить файл
                        console.log('Файл успешно удалён');
                    });
                }
                let fileName = v4() + '.png'
                files.mv(path.resolve(__dirname, '..', 'static/img', fileName))
                await Models.Сategory.update({ route, name, image: fileName }, { where: { id: id } })
            } else {
                console.log('Без файла>')

                await Models.Сategory.update({ route, name }, { where: { id: id } })
            }
            return res.json('Категория изменена')
        } catch (error) {
            console.log('Ошибка изменения категории')
        }
    }

    async deleteCategory(req, res, next) {
        const { id } = req.body;
        try {
            let categ = await Models.Сategory.findOne({ where: { id: id } })
            if (categ.image === null) {
                await Models.Сategory.destroy({ where: { id: id } })
            } else {

                fs.unlink(path.resolve(__dirname, '..', 'static/img', categ.image), err => {
                    if (err) throw err; // не удалось удалить файл
                    console.log('Файл успешно удалён');
                });
                await Models.Сategory.destroy({ where: { id: id } })
            }

            return res.json('Категория удалена')
        } catch (error) {
            console.log('Ошибка удаления категории')
        }
    }
    async deleteGoods(req, res, next) {
        const { id } = req.body;

        const goods = await Models.Goods.findOne({ where: { id: id } })
        let arrImg = JSON.parse(goods.imageURL)
        for (let i = 0; i < arrImg.length; i++) {
            fs.unlink(path.resolve(__dirname, '..', 'static/img', arrImg[i]), err => {
                if (err) throw err; // не удалось удалить файл
                console.log('Файл успешно удалён');
            });
        }
        const favorites = await Models.Favorites.findAll()
        for (let i = 0; i < favorites.length; i++) {
            let list = favorites[i].lists
            let arr = JSON.parse(list)
            let arr2 = arr.filter(e => e !== id)
            let res = JSON.stringify(arr2)
            await Models.Favorites.update({ lists: res }, { where: { idUser: favorites[i].idUser } })
        }
        const baskets = await Models.Basket.findAll()
        for (let i = 0; i < baskets.length; i++) {
            let list = baskets[i].lists
            let arr = JSON.parse(list)
            let arr2 = arr.filter(e => e !== id)
            let res = JSON.stringify(arr2)
            await Models.Basket.update({ lists: res }, { where: { idUser: baskets[i].idUser } })
        }
        try {
            await Models.Goods.destroy({ where: { id: id } })
            return res.json('Товар удален ')
        } catch (error) {
            console.log('Ошибка удаления товара')
        }
    }
    async getAllGoods(req, res, next) {
        try {

            const goods = await Models.Goods.findAll()
            for (let i = 0; i < goods.length; i++) {
                let arrImg = JSON.parse(goods[i].imageURL)
                goods[i].imageURL = arrImg;
            }
            return res.json(goods)
        } catch (error) {
            console.log('Ошибка получения товаров')
        }
    }
    async getOneGoods(req, res, next) {
        const { id } = req.body;
        try {
            const goods = await Models.Goods.findOne({ where: { id: id } })

            let arrImg = JSON.parse(goods.imageURL)
            goods.imageURL = arrImg;
            return res.json(goods)
        } catch (error) {
            console.log('Ошибка получения товара')
        }
    }


    async getOneGoodsUser(req, res, next) {
        const { id } = req.body;
        const user = req.user;
        console.log(id);
        try {
            const goods = await Models.Goods.findOne({ where: { id: id } })
            const basket = await Models.Basket.findOne({ where: { idUser: user.id } })
            let arrBasket;
            let arrarrBasket2 = [];
            if (basket) {
                arrBasket = JSON.parse(basket.lists)
                arrarrBasket2 = arrBasket.map(e => Number(e.idGoods))
            }
            let arrImg = JSON.parse(goods.imageURL)
            let obj;

            goods.imageURL = arrImg;

            if (arrarrBasket2.includes(Number(id))) {
                obj = Object.assign(goods.dataValues, { inBasket: true })
            } else {
                obj = Object.assign(goods.dataValues, { inBasket: false })
            }
            return res.json(obj)
        } catch (error) {
            console.log('Ошибка получения товара для пользователя')
        }
    }
    async editGoods(req, res, next) {
        const { id } = req.body;
        const user = req.user;
        try {
            return res.json(obj)

        } catch (error) {
            console.log('Ошибка изменения товара')

        }

    }



    async addImages(req, res, next) {
        try {
            const { idGoods } = req.body;
            const files = req.files
            const goods = await Models.Goods.findOne({ where: { id: idGoods } })
            let arr = JSON.parse(goods.dataValues.imageURL)
            let imgArrUrl = arr;
            if (files.files.length) {
                for (let index = 0; index < files.files.length; index++) {
                    let fileName = v4() + '.png'
                    files.files[index].mv(path.resolve(__dirname, '..', 'static/img', fileName))
                    imgArrUrl.push(fileName)
                }
                let imageJson = JSON.stringify(imgArrUrl)
                await Models.Goods.update({ imageURL: imageJson }, { where: { id: idGoods } })
            } else {
                let fileName = v4() + '.png'
                files.files.mv(path.resolve(__dirname, '..', 'static/img', fileName))
                imgArrUrl.push(fileName)
                let imageJson = JSON.stringify(imgArrUrl)
                await Models.Goods.update({ imageURL: imageJson }, { where: { id: idGoods } })
            }

            return res.json('Новые изображения добавлены в товар')
        } catch (error) {
            console.log('Ошибка добавления изображений в товар')
        }
    }


    async editText(req, res, next) {
        try {
            const { name, price, category, description, composition, quantity, idGoods } = req.body;
            await Models.Goods.update({ name, price, category, description, composition, quantity }, { where: { id: idGoods } })

            return res.json('Текст товара изменен')
        } catch (error) {
            console.log('Ошибка изменения текста')
        }
    }


    async editImages(req, res, next) {
        try {
            const { idGoods, list } = req.body;
            const goods = await Models.Goods.findOne({ where: { id: idGoods } })
            let arr = JSON.parse(list)
            let arrimg = JSON.parse(goods.dataValues.imageURL)
            let deleteList = arrimg.filter(e => !arr.includes(e))
            for (let i = 0; i < deleteList.length; i++) {
                fs.unlink(path.resolve(__dirname, '..', 'static/img', deleteList[i]), err => {
                    if (err) throw err; // не удалось удалить файл
                    console.log('Файл успешно удалён');
                });
            }
            let imageJson = JSON.stringify(arr)
            await Models.Goods.update({ imageURL: imageJson }, { where: { id: idGoods } })
            return res.json('Изображение товара изменнено ')
        } catch (error) {
            console.log('Ошибка изменения изображения товара')
        }
    }

}

export default new goodsController()
