import express from 'express'
import mongoose from 'mongoose'
import { APP_PORT, DB_URL } from './src/config'

const app = express()

import routes from './src/routes'

//DB Connection 
mongoose.connect(DB_URL,{useNewUrlParser:true, useUnifiedTopology:true})




app.listen(APP_PORT,() => console.log(`Listinig on port ${APP_PORT}`))