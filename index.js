import express from 'express'
import mongoose from 'mongoose'
import { APP_PORT, DB_URL } from './src/config'
import errorHandler from './src/middlewares/errorHandler'

import path from 'path'

import swaggerUi  from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
// import multer from 'multer'

import routes from './src/routes'
import { swaggerCustomUI } from './public/css/customCss'

// const upload = multer()
const app = express()

const {join} = path

//📌Note: By default JSON in Express JS --==> ❎disable 
app.use(express.json()) //✅ Enable

//#region 🔗DB Connection 
mongoose.connect(DB_URL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('DB connected...')
})
//#endregion

// Static Files
app.use(express.static('public'));

// Example for other olders
app.use('/css', express.static(__dirname + 'public/css'))

//#region Swagger Setup
var options = {
    customCss: `${swaggerCustomUI}`,
    customSiteTitle: "Portfolio API | Welcome",
    customfavIcon: "../assets/portfolio_setu_icon.png"
};
// app.use(express.static(path.join(__dirname, './public/assets')));
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument,options))
//#endregion

// For parsing multipart/form-data
// app.use(upload.array())

//Get root folder
global.appRoot = path.resolve(__dirname)
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))


//📌Note: For view image globally
// app.use('/uploads',express.static('/uploads'))
app.use('/uploads',express.static('uploads'))

// app.use('/swagger', express.static('./node_modules/swagger-ui-themes/themes/3.x/theme-feeling-blue.css'));

//Routes
app.use(routes)

//Error Handler
app.use(errorHandler)

//Port Listen
app.listen(APP_PORT, () => console.log(`Listinig on port ${APP_PORT}`))