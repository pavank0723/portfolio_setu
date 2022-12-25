import { PortfolioCateg } from "../../models"

const portfolioCategController = {
    //Create 
    async store(req, res, next) {
        const { cat_id, name, description, isActive } = req.body
        let document

        try {
            document = await PortfolioCateg.create(
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
        try {
            document = await PortfolioCateg.findOneAndUpdate(
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

    //Update in work by ID
    async add_work(req, res, next) {

        const { workId } = req.body
        let document
        try {
            document = await PortfolioCateg.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $push:{
                        works:workId
                    }
                },
                { new: true }
            )
            console.log(document)
        } catch (error) {
            return next(error)
        }
        res.status(201).json(document)
    },
    
    //remove in work by ID
    async remove_work(req, res, next) {

        const { workId } = req.body
        let document
        try {
            document = await PortfolioCateg.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $pull:{
                        works:workId
                    }
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
            document = await PortfolioCateg.findOne(
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
            documents = await PortfolioCateg.find().populate({
                path: 'works', //Come from model i.e. works(Object)
                select:'_id title demo image',
            }).select('-updatedAt -__v').sort(
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
        const document = await PortfolioCateg.findOneAndRemove(
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

export default portfolioCategController