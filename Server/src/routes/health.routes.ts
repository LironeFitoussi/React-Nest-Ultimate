import { Router } from 'express'

const router = Router()

/**
 * Health check
 * @route GET /api/v1/health
 * @description Health check
 */
router.get('/', (req, res) => {
  res.send('Test route working successfully')
})

export default router
