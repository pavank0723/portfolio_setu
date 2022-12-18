import express from "express"
import { experienceController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store', experienceController.store)
route.get('/views', experienceController.show)
route.get('/view/:id', experienceController.index)
route.put('/edit/:id', experienceController.edit)
route.delete('/destroy/:id', experienceController.destroy)

export default route