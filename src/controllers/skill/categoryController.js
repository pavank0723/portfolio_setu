import { SkillCateg } from "../../models"

const skillCategController = {
    //Create 
    async store(req, res, next) {
        const { cat_id, name,icon, description, isActive } = req.body
        let document

        try {
            document = await SkillCateg.create(
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

    //Get All
    async show(req, res, next) {
        let documents

        try {
            documents = await SkillCateg.find().select('-updatedAt -__v').sort(
                {
                    _id: -1
                }
            )
        } catch (error) {
            return next(error)
        }

        return res.json(documents)
    },

    //Get category by id
    async index(req, res, next) {
        let document
        try {
            document = await SkillCateg.findOne(
                {
                    _id: req.params.id
                }
            )
        } catch (error) {
            return next(error)
        }

        return res.json(document)
    },

    //Update
    async edit(req, res, next) {

        const { name, description,icon, isActive } = req.body
        let document
        try {
            document = await SkillCateg.findByIdAndUpdate(
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

    //Delete
    async destroy(req, res, next) {
        const document = await SkillCateg.findOneAndRemove(
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

export default skillCategController