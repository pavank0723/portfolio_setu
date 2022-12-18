import express from "express"
import { socialMediaController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin],socialMediaController.store)
route.get('/views',socialMediaController.show)
route.get('/view/:id',socialMediaController.index)
route.put('/edit/:id',[auth,admin],socialMediaController.edit)
route.delete('/destroy/:id',[auth,admin],socialMediaController.destroy)

export default route