import express from "express"
import { certificateCategController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth, admin], certificateCategController.store)
route.get('/views', certificateCategController.index)
route.get('/view/:id', certificateCategController.show)
route.put('/edit/:id',[auth, admin], certificateCategController.edit)
route.delete('/destroy/:id',[auth, admin], certificateCategController.destroy)

export default route