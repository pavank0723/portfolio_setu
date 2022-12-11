import express from "express"
import { portfolioCategController } from "../../controllers";

var route = express.Router();

route.post('/store', portfolioCategController.store)
route.get('/views', portfolioCategController.index)
route.get('/view/:id', portfolioCategController.show)
route.put('/edit/:id', portfolioCategController.edit)
route.delete('/destroy/:id', portfolioCategController.destroy)

export default route