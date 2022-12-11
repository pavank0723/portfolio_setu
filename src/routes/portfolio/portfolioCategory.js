import express from "express"
import { portfolioCategController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth, admin], portfolioCategController.store)
route.get('/views', portfolioCategController.index)
route.get('/view/:id', portfolioCategController.show)
route.put('/edit/:id',[auth, admin], portfolioCategController.edit)
route.delete('/destroy/:id',[auth, admin], portfolioCategController.destroy)

export default route