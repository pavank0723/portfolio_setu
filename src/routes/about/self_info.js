import express from "express"
import { aboutController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin],aboutController.store)
route.get('/views',aboutController.show)
route.get('/view/:id',aboutController.index)
route.put('/edit/:id',[auth,admin],aboutController.edit)
route.delete('/destroy/:id',[auth,admin],aboutController.destroy)

export default route