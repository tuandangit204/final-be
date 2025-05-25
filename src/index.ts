import express from 'express'
import dbConnect from './db/dbConnect'
import authRoutes from './modules/auth/routes'
import postRoutes from './modules/post/routes'
import userRoutes from './modules/user/routes'

const PORT = 8080

dbConnect()

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
