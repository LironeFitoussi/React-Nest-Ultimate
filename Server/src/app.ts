import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// Routes imports 
import healthRouter from './routes/health.routes'
import userRouter from './routes/user.routes'
import testRouter from './routes/test.routes'
import authRouter from './routes/auth.routes'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ credentials: true }))

// Test route
app.get('/', (req, res) => {
  res.send('Expense Manager API is running')
})

// Routes
app.use('/api/v1/health', healthRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tests', testRouter)

export default app


