import { Router } from 'express'
import settingController from '../controllers/settingController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'


const router = new Router()

router.post('/set', checkRoleMiddleware('ADMIN'), settingController.addSettingSite)
router.get('/get', settingController.getSettingSite)



export default router;

