import express from "express"
import { techSkillController } from "../../controllers";
import { admin, auth } from "../../middlewares";

var route = express.Router();

route.post('/store',[auth, admin],techSkillController.store)
route.get('/views',techSkillController.show)
route.get('/view/:id',techSkillController.index)
route.put('/edit/:id',[auth, admin],techSkillController.edit)
route.delete('/destroy/:id',[auth, admin],techSkillController.destroy)

export default route