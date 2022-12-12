import { AboutInfo } from "../../models"

const infoCategoryController = {
    //Create 
    async store(req, res, next) {

        const { info_id, title, subtitle,icon,isActive } = req.body
        let document
        try {
            document = await AboutInfo.create(
                {
                    info_id,
                    title,
                    subtitle,
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
        const { title, subtitle,icon,link, isActive } = req.body
        let document

        try {
            document = await AboutInfo.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    title,
                    subtitle,
                    icon,
                    link, 
                    isActive
                },
                { new: true }
            )
            console.log(document)
        } catch (error) {
            return next(error)
        }
        res.json(document)
    },

    //Get Certificate Categ by id
    async index(req,res,next){
        let document
        try {
            document = await AboutInfo.findOne(
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
            documents = await AboutInfo.find().select('-updatedAt -__v').sort(
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
        const document = await AboutInfo.findOneAndRemove(
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

export default infoCategoryController