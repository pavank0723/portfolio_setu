import express from "express"
import { aboutController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth,admin],aboutController.store)
route.get('/views',aboutController.show)
route.get('/view/:id',aboutController.index)
route.put('/edit/:id',[auth,admin],aboutController.edit)
route.post('/add_social_link/:id',[auth,admin],aboutController.add_social_link)
route.delete('/remove_social_link/:id',[auth,admin],aboutController.remove_social_link)
route.post('/add_info_category/:id',[auth,admin],aboutController.add_info_category)
route.delete('/remove_info_category/:id',[auth,admin],aboutController.remove_info_category)
route.delete('/destroy/:id',[auth,admin],aboutController.destroy)

export default route