import { Router } from 'express'
import goodsController from '../controllers/goodsController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'


const router = new Router()

//router.post('/add-goods', goodsController.addGoods)
router.post('/add-goods', checkRoleMiddleware('ADMIN'), goodsController.addGoods)
router.get('/get-all-goods', checkRoleMiddleware('ADMIN'), goodsController.getAllGoods)
router.post('/get-one-goods-user', authMiddleware, goodsController.getOneGoodsUser)
router.post('/get-one-goods', goodsController.getOneGoods)


//router.get('/get-all-goods', goodsController.getAllGoods)

router.post('/add-category', checkRoleMiddleware('ADMIN'), goodsController.setCategory)
//router.get('/get-category', checkRoleMiddleware('ADMIN'), goodsController.getCategoryList)
router.get('/get-category', goodsController.getCategoryList)
router.post('/get-category-goods', goodsController.getCategoryGoods)

router.post('/edit-category', checkRoleMiddleware('ADMIN'), goodsController.editCategory)
router.post('/delete-category', checkRoleMiddleware('ADMIN'), goodsController.deleteCategory)
router.post('/delete-goods', checkRoleMiddleware('ADMIN'), goodsController.deleteGoods)
router.post('/edit-goods', checkRoleMiddleware('ADMIN'), goodsController.editGoods)


router.post('/edit-text', checkRoleMiddleware('ADMIN'), goodsController.editText)
router.post('/add-img', checkRoleMiddleware('ADMIN'), goodsController.addImages)
router.post('/edit-img', checkRoleMiddleware('ADMIN'), goodsController.editImages)






export default router;