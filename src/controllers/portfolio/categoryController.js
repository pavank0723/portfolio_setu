import { CatCount, Category } from "../../models"

const categoryController = {
    async store(req, res, next) {

        const { name, description, isActive } = req.body
        let document
        let seqId
        try {
            await CatCount.findOneAndUpdate(
                { id: "autoval" },
                { "$inc": { "seq": 1 } },
                { new: true }, (err, cd) => {
                    
                    if (cd == null) {
                        const newVal = CatCount({ id: "autova", seq: 1 })
                        newVal.save()
                        seqId = 1
                    } else {
                        seqId = cd.seq
                    }

                    document = Category.create(
                        {
                            cat_id: seqId,
                            name,
                            description,
                            isActive
                        }
                    )
                }
            )

        } catch (error) {
            return next(error)
        }
        res.status(201).json(document)
    }
}

export default categoryController