import { Router } from 'express'
import favoritesController from '../controllers/favoritesController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'


const router = new Router()

router.post('/add', authMiddleware, favoritesController.addFavorites)
router.post('/get', authMiddleware, favoritesController.getFavorites)
router.post('/delete', authMiddleware, favoritesController.deleteFavorites)
router.get('/get-goods', authMiddleware, favoritesController.getFavoritesGoods)


export default router;