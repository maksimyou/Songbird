
import { Router } from 'express'
import basketController from '../controllers/basketController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'


const router = new Router()

router.post('/add', authMiddleware, basketController.addBasket)
router.post('/get', authMiddleware, basketController.getBasket)
router.post('/delete', authMiddleware, basketController.deleteBasket)
router.get('/get-goods', authMiddleware, basketController.getBasketGoods)


export default router;