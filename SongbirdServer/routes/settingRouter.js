import { Router } from 'express'
import settingController from '../controllers/settingController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'


const router = new Router()

router.post('/set', checkRoleMiddleware('ADMIN'), settingController.addSettingSite)
router.get('/get', settingController.getSettingSite)
router.post('/set-home', checkRoleMiddleware('ADMIN'), settingController.addSettingHome)
router.get('/get-home', settingController.getSettingHome)
router.post('/set-bonus', checkRoleMiddleware('ADMIN'), settingController.addSettingBonuses)
router.get('/get-bonus', checkRoleMiddleware('ADMIN'), settingController.getSettingBonuses)


export default router;

