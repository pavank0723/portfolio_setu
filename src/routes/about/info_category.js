import express from "express"
import { infoCategoryController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin],infoCategoryController.store)
route.get('/views',infoCategoryController.show)
route.get('/view/:id',infoCategoryController.index)
route.put('/edit/:id',[auth,admin],infoCategoryController.edit)
route.delete('/destroy/:id',[auth,admin],infoCategoryController.destroy)

export default route