import express from "express"
import { experienceController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin], experienceController.store)
route.get('/views', experienceController.show)
route.get('/view/:id', experienceController.index)
route.put('/edit/:id',[auth,admin], experienceController.edit)
route.delete('/destroy/:id',[auth,admin], experienceController.destroy)

export default route