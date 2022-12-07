import { Category } from "../../models"

const categoryController = {
    //Create 
    async store(req, res, next) {

        const { cat_id, name, description, isActive } = req.body
        let document
        try {
            document = await Category.create(
                {
                    cat_id,
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
        var stringified = JSON.stringify(document);
        var parsedObj = JSON.parse(stringified);
        try {
            document = await Category.findByIdAndUpdate(
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
        res.status(201).json(parsedObj)
    },

    //Get category by id
    async show(req, res, next) {
        let document
        try {
            document = await Category.findOne(
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
    async index(req, res, next) {
        let documents

        try {
            documents = await Category.find().select('-updatedAt -__v').sort(
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
        const document = await Category.findOneAndRemove(
            {
                _id: req.params.id
            }
        )
        if (!document) {
            return next(new Error('Nothing to delete'))
        }

        return res.json(document)
    }
}

export default categoryController