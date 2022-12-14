import express from "express"
import { certificateController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth, admin],certificateController.store)
route.get('/views',certificateController.show)
route.get('/view/:id',certificateController.index)
route.put('/edit/:id',[auth, admin],certificateController.edit)
route.delete('/destroy/:id',[auth, admin],certificateController.destroy)

export default route