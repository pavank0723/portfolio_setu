import express from "express"
import { testimonialController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin],testimonialController.store)
route.get('/views',testimonialController.show)
route.get('/view/:id',testimonialController.index)
route.put('/edit/:id',[auth,admin],testimonialController.edit)
route.delete('/destroy/:id',[auth,admin],testimonialController.destroy)

export default route