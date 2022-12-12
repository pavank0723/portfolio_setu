import express from "express"
import { infoCategoryController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',infoCategoryController.store)
route.get('/views',infoCategoryController.show)
route.get('/view/:id',infoCategoryController.index)
route.put('/edit/:id',infoCategoryController.edit)
route.delete('/destroy/:id',infoCategoryController.destroy)

export default route