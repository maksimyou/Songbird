
import { Router } from 'express'
import orderController from '../controllers/orderController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'


const router = new Router()

router.post('/add', authMiddleware, orderController.addOrder)
router.get('/get-orders', checkRoleMiddleware('ADMIN'), orderController.getOrders)
router.get('/get-order', authMiddleware, orderController.getOrder)
router.post('/set-status', checkRoleMiddleware('ADMIN'), orderController.setStatuesOrder)
router.post('/add-status', orderController.addStatus)

export default router;