import express from "express"
import { techSkillController } from "../../controllers";

var route = express.Router();

route.post('/store',techSkillController.store)
route.get('/views',techSkillController.show)
route.get('/view/:id',techSkillController.index)
route.put('/edit/:id',techSkillController.edit)
route.delete('/destroy/:id',techSkillController.destroy)

export default route