import express from "express"
import { skillCategController } from "../../controllers";

var route = express.Router();

route.post('/store',skillCategController.store)
route.get('/views',skillCategController.show)
route.get('/view/:id',skillCategController.index)
route.put('/edit/:id',skillCategController.edit)
route.delete('/destroy/:id',skillCategController.destroy)

export default route