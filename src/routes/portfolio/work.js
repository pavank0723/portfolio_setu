import express from "express"
import { workController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth, admin], workController.store)
route.get('/views', workController.view)
route.get('/view/:id', workController.show)
route.put('/edit/:id',[auth, admin], workController.edit)
route.delete('/destroy/:id',[auth, admin], workController.destroy)

export default route