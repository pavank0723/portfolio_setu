import express from "express"
import { socialMediaController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',socialMediaController.store)
route.get('/views',socialMediaController.show)
route.get('/view/:id',socialMediaController.index)
route.put('/edit/:id',socialMediaController.edit)
route.delete('/destroy/:id',socialMediaController.destroy)

export default route