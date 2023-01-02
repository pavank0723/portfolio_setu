import express from "express"
import { workController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store', workController.store)
route.get('/views', workController.show)
route.get('/view/:id', workController.index)
route.put('/edit/:id',[auth, admin], workController.edit)
route.delete('/destroy/:id', workController.destroy)

export default route