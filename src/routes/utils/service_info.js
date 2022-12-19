import express from "express"
import { serviceInfoController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin],serviceInfoController.store)
route.get('/views',serviceInfoController.show)
route.get('/view/:id',serviceInfoController.index)
route.put('/edit/:id',[auth,admin],serviceInfoController.edit)
route.delete('/destroy/:id',[auth,admin],serviceInfoController.destroy)

export default route