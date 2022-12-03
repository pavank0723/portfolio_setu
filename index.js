import express from 'express'
import mongoose from 'mongoose'
import { APP_PORT, DB_URL } from './src/config'
import errorHandler from './src/middlewares/errorHandler'

import path from 'path'

const app = express()

import routes from './src/routes'

//#region 🔗DB Connection 
mongoose.connect(DB_URL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('DB connected...')
})
//#endregion

//📌Note: By default JSON in Express JS --==> ❎disable 
app.use(express.json()) //✅ Enable

//Routes
app.use(routes)

//📌Note: For view image globally
app.use('/uploads',express.static('uploads'))

//Get root folder
global.appRoot = path.resolve(__dirname)
app.use(express.urlencoded(
    {
        extended:false   
    }
))
//Error Handler
app.use(errorHandler)

//Port Listen
app.listen(APP_PORT, () => console.log(`Listinig on port ${APP_PORT}`))