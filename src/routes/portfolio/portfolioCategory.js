import express from "express"
import { portfolioCategController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store', portfolioCategController.store)
route.get('/views', portfolioCategController.show)
route.get('/view/:id', portfolioCategController.index)
route.put('/edit/:id',[auth, admin], portfolioCategController.edit)
route.post('/add_work/:id',[auth,admin], portfolioCategController.add_work)
route.delete('/remove_work/:id',[auth, admin], portfolioCategController.remove_work)
route.delete('/destroy/:id',[auth, admin], portfolioCategController.destroy)

export default route