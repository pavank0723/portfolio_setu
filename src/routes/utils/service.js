import express from "express"
import { serviceController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin],serviceController.store)
route.get('/views',serviceController.show)
route.get('/view/:id',serviceController.index)
route.put('/edit/:id',[auth,admin],serviceController.edit)
route.delete('/destroy/:id',[auth,admin],serviceController.destroy)

export default route