import express from "express"
import { certificateController } from "../../controllers";

var route = express.Router();

route.post('/store',certificateController.store)
route.get('/views',certificateController.view)
route.get('/view/:id',certificateController.show)
route.put('/edit/:id',certificateController.edit)
route.delete('/destroy/:id',certificateController.destroy)

export default route