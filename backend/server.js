import 'dotenv/config'

import './config/connection.js'

import express from 'express'
import cors from 'cors'

import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'

const app = express()

const port = process.env.PORT || 3000

app.use(cors({origin: [process.env.FRONTEND_URL,'http://localhost:5173']}))
app.use(express.json())

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)


app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.listen(port,()=> console.log(`Listinening on port: http://localhost:${port}`))