import express from "express"
import { qualificationCategController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin], qualificationCategController.store)
route.get('/views', qualificationCategController.show)
route.get('/view/:id', qualificationCategController.index)
route.put('/edit/:id',[auth,admin], qualificationCategController.edit)
route.delete('/destroy/:id',[auth,admin], qualificationCategController.destroy)

export default route