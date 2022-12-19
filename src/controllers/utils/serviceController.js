import { Service } from "../../models"

const serviceController = {
    //Create 
    async store(req, res, next) {

        const { title, description,icon, isActive } = req.body
        let document
        try {
            document = await Service.create(
                {
                    title,
                    description,
                    icon,                  
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
        const { title, description,icon, isActive } = req.body
        let document

        try {
            document = await Service.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    title,
                    description,
                    icon,
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
            document = await Service.findOne(
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
            documents = await Service.find().select('-updatedAt -__v').sort(
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
        const document = await Service.findOneAndRemove(
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

export default serviceController