import { QualificationCateg } from "../../models"

const qualificationCategController = {
    //Create 
    async store(req, res, next) {
        const { cat_id, name, description,icon, isActive } = req.body
        let document

        try {
            document = await QualificationCateg.create(
                {
                    cat_id,
                    name,
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

        const { name, description,icon, isActive } = req.body
        let document
        try {
            document = await QualificationCateg.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    name,
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

    //Get category by id
    async index(req, res, next) {
        let document
        try {
            document = await QualificationCateg.findOne(
                {
                    _id: req.params.id
                }
            )
        } catch (error) {
            return next(error)
        }

        return res.json(document)
    },

    //Get All
    async show(req, res, next) {
        let documents

        try {
            documents = await QualificationCateg.find().select('-updatedAt -__v').sort(
                {
                    _id: -1
                }
            )
        } catch (error) {
            return next(error)
        }

        return res.json(documents)
    },

    //Delete
    async destroy(req, res, next) {
        const document = await QualificationCateg.findOneAndRemove(
            {
                _id: req.params.id
            }
        )
        if (!document) {
            return next(new Error('Nothing to delete'))
        }

        res.json(document)
    }
}

export default qualificationCategController