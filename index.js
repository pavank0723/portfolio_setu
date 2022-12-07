import express from 'express'
import mongoose from 'mongoose'
import { APP_PORT, DB_URL } from './src/config'
import errorHandler from './src/middlewares/errorHandler'

import path from 'path'

import swaggerUi  from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

import multer from 'multer'

const upload = multer()

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

//#region Swagger Setup
var options = {
    //customCss: '.swagger-ui .topbar {background-color: #3f6cff;}.swagger-ui .opblock.opblock-post .opblock-summary-method {background: #0255c1;}',
    customSiteTitle: "Portfolio API | Welcome"
};

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument,options))
//#endregion

//📌Note: By default JSON in Express JS --==> ❎disable 
app.use(express.json()) //✅ Enable

//📌Note: For view image globally
app.use('/uploads',express.static('uploads'))

//Get root folder
global.appRoot = path.resolve(__dirname)
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// For parsing multipart/form-data
app.use(upload.array()); 

//Routes
app.use(routes)

//Error Handler
app.use(errorHandler)

//Port Listen
app.listen(APP_PORT, () => console.log(`Listinig on port ${APP_PORT}`))