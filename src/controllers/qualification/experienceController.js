import { Experience } from "../../models"

const experienceController = {
    //Create 
    async store(req, res, next) {
        const { title, subtitle, start_year,end_year, isActive } = req.body
        let document

        try {
            document = await Experience.create(
                {
                    title,
                    subtitle,
                    start_year,
                    end_year,
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

        const { title,subtitle, start_year,end_year, isActive } = req.body
        let document
        try {
            document = await Experience.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    title,
                    subtitle,
                    start_year,
                    end_year,
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
            document = await Experience.findOne(
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
            documents = await Experience.find().select('-updatedAt -__v').sort(
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
        const document = await Experience.findOneAndRemove(
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

export default experienceController