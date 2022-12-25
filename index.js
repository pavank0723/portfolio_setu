import express from 'express'
import mongoose from 'mongoose'
import { APP_PORT, DB_URL } from './src/config'
import errorHandler from './src/middlewares/errorHandler'

import path from 'path'

import swaggerUi  from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

import routes from './src/routes'
import { swaggerCustomUI } from './public/css/customCss'
import cors from 'cors'

// const upload = multer()
const app = express()

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

// app.use(cors({
//     origin: 'http://localhost:5100', // use your actual domain name (or localhost), using * is not recommended
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
//     credentials: true
// }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Example for other olders
app.use('/css', express.static(__dirname + 'public/css'))

//#region Swagger Setup
var options = {
    customCss: `${swaggerCustomUI}`,
    customSiteTitle: "Portfolio Setu API | Welcome",
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
app.use('/uploads',express.static('uploads'))

//Routes
app.use(routes)

//Error Handler
app.use(errorHandler)

//Port Listen
const port = APP_PORT || 6000;
app.listen(port, () => console.log(`Listinig on port ${APP_PORT}`))