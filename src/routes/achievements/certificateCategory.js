import express from "express"
import { certificateCategController } from "../../controllers";

var route = express.Router();

route.post('/store', certificateCategController.store)
route.get('/views', certificateCategController.index)
route.get('/view/:id', certificateCategController.show)
route.put('/edit/:id', certificateCategController.edit)
route.delete('/destroy/:id', certificateCategController.destroy)

export default route