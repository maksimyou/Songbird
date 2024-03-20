import { Router } from 'express'
import mailController from '../controllers/mailController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'


const router = new Router()

router.post('/send', mailController.postEmail)
router.post('/send-telegram', mailController.messageTelegram)


export default router;