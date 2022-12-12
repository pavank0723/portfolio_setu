import express from "express"
import { aboutController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',aboutController.store)
route.get('/views',aboutController.show)
route.get('/view/:id',aboutController.index)
route.put('/edit/:id',aboutController.edit)
route.delete('/destroy/:id',aboutController.destroy)

export default route