import express from "express"
import { workController } from "../../controllers";

var route = express.Router();

route.post('/store', workController.store)
route.get('/views', workController.view)
route.get('/view/:id', workController.show)
route.put('/edit/:id', workController.edit)
route.delete('/destroy/:id', workController.destroy)

export default route