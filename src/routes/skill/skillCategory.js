import express from "express"
import { skillCategController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth, admin],skillCategController.store)
route.get('/views',skillCategController.show)
route.get('/view/:id',skillCategController.index)
route.put('/edit/:id',[auth, admin],skillCategController.edit)
route.delete('/destroy/:id',[auth, admin],skillCategController.destroy)

export default route