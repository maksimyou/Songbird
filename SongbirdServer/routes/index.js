import { Router } from 'express'
import userRouter from './userRouter.js'
import goodsRouter from './goodsRouter.js'
import mailRouter from './mailRouter.js'
import settingRouter from './settingRouter.js'
import favoritesRouter from './favoritesRouter.js'
import basketRouter from './basketRouter.js'
import orderRouter from './orderRouter.js'


const router = new Router()

router.use('/user', userRouter)
router.use('/goods', goodsRouter)
router.use('/mail', mailRouter)
router.use('/setting', settingRouter)
router.use('/favorites', favoritesRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)




export default router;