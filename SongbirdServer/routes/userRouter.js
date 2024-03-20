import { Router } from 'express'
import userConstroller from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'


const router = new Router()

router.post('/registration', userConstroller.registration)
//router.post('/step-email', userConstroller.registrationStepEmail)
//router.post('/step-login', userConstroller.registrationStepLogin)
router.post('/login', userConstroller.login)
router.get('/auth', authMiddleware, userConstroller.check)
router.get('/first-name', authMiddleware, userConstroller.getFirstName)
router.get('/get-role', authMiddleware, userConstroller.getRole)
router.get('/get-id', authMiddleware, userConstroller.getUsersId)

router.post('/set-role', checkRoleMiddleware('ADMIN'), userConstroller.installRole)
router.get('/get-users', checkRoleMiddleware('ADMIN'), userConstroller.getUsers)
router.get('/get-user', authMiddleware, userConstroller.getUserData)


router.post('/reg-admin', userConstroller.registrationAdmin)
router.post('/confirm-mail', userConstroller.postConfirmation)
router.post('/generation-code', userConstroller.generationCodeChecks)


router.post('/delete', checkRoleMiddleware('ADMIN'), userConstroller.deleteUser)
router.post('/edit-user', checkRoleMiddleware('ADMIN'), userConstroller.editUserRole)
router.post('/edit-data-user', authMiddleware, userConstroller.editUserData)




export default router;