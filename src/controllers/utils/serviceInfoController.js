import { ServiceInfo } from "../../models"

const serviceInfoController = {
    //Create 
    async store(req, res, next) {

        const { name, description, isActive } = req.body
        let document
        try {
            document = await ServiceInfo.create(
                {
                    name,
                    description,      
                    isActive
                }
            )
        } catch (error) {
            return next(error)
        }
        res.status(201).json(document)
    },

    //Update
    async edit(req, res, next) {
        const { name, description, isActive } = req.body
        let document

        try {
            document = await ServiceInfo.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    name,
                    description,
                    isActive
                },
                { new: true }
            )
            console.log(document)
        } catch (error) {
            return next(error)
        }
        res.status(201).json(document)
    },

    //Get Certificate Categ by id
    async index(req,res,next){
        let document
        try {
            document = await ServiceInfo.findOne(
                {
                    _id : req.params.id
                }
            )
        } catch (error) {
            return next(error)
        }

        return res.json(document)
    },

    //Get All
    async show(req,res,next){
        let documents

        try {
            documents = await ServiceInfo.find().select('-updatedAt -__v').sort(
                {
                    _id:-1
                }
            )
        } catch (error) {
            return next(error)
        }

        return res.json(documents)
    },

    //Delete
    async destroy(req,res,next) {
        const document = await ServiceInfo.findOneAndRemove(
            {
                _id:req.params.id
            }
        )
        if(!document){
            return next(new Error('Nothing to delete'))       
        }

        res.json(document)
    }
}

export default serviceInfoController