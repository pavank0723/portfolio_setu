import express from "express"
import { aboutController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin],aboutController.store)
route.get('/views',aboutController.show)
route.get('/view/:id',aboutController.index)
route.put('/edit/:id',[auth,admin],aboutController.edit)
route.put('/edit_social_link/:id',[auth,admin],aboutController.edit_social_link)
route.put('/edit_info_category/:id',[auth,admin],aboutController.edit_info_category)
route.delete('/destroy/:id',[auth,admin],aboutController.destroy)

export default route