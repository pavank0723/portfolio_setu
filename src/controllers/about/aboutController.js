import { About } from "../../models"
import CustomErrorHandler from "../../services/CustomErrorHandler"
import fs from "fs"
import path from "path"
import multer from "multer"
import { aboutSchema } from "../../validations/aboutValidator"

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => cb(null, "uploads/utils/"),
        filename: (req, file, cb) => {
            const uniqueName = `pavan's_resume-${Date.now()}${path.extname(file.originalname)}`
            cb(null, uniqueName)
        }
    }
)

const handleMultipartData = multer(
    {
        storage,
        limits: {
            fileSize: 1000000 * 5 //5MB
        },
    }
).single('doc')


const aboutController = {
    //Create
    async store(req, res, next) {

        //Multipart form data --==> install multer to handling multi data
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message))
            }
            // console.log(req.body)

            const filePath = req.file.path.replace(/\\/g, "/")

            // var newFilePath = filePath.split('\\').join('/')
            console.log('==>>>>>>>', filePath)

            //Validation from productValidator

            //==--->> 2. Joi Validate if error
            const { error } = aboutSchema.validate(req.body)
            if (error) {
                //Delete the uploaded file when validation failed
                fs.unlink(`${appRoot}/${filePath}`, (err) => { //root_folder/upload/products.extenstion(png/jpg)
                    if (err) {
                        return next(CustomErrorHandler.serverError(err.message))
                    }
                }
                )
                return next(error)
            }
            const { name, description, isActive } = req.body
            let document

            try {
                document = await About.create(
                    {
                        name,
                        description,
                        isActive,
                        doc: filePath
                    }
                )
            } catch (error) {
                //Delete the uploaded file when validation failed
                fs.unlink(`${appRoot}/${filePath}`, (error) => { //root_folder/upload/products.extenstion(png/jpg)
                    if (error) {
                        return next(CustomErrorHandler.serverError(error.message))
                    }
                }
                )
                return next(error)
            }
            res.status(201).json(document)
        }
        )
    },
    //Read all work
    async show(req, res, next) {
        let documents
        try {
            documents = await About.find().populate(
                [
                    {
                        path: 'social_link',
                        select: '_id title icon link isActive'
                    },
                    {
                        path: 'info_category',
                        select: '_id title subtitle icon isActive'
                    }
                ]
            ).select('-updatedAt -__v').sort(
                {
                    _id: -1
                }
            )
        } catch (error) {
            return next(CustomErrorHandler.serverError())
        }
        return res.json(documents)
    },

    //Read work by ID
    async index(req, res, next) {
        let document
        try {
            document = await About.findOne(
                {
                    _id: req.params.id
                }
            ).select('-updatedAt -__v')
        } catch (error) {
            return next(error)
        }
        res.json(document)
    },

    //Update
    async edit(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message))
            }

            let filePath
            if (req.file) {
                filePath = req.file.path.replace(/\\/g, "/")
            }
            console.log("===>>>>>>", filePath)

            //Validation
            const portfolioValidator = aboutSchema.validate(req.body)

            //Joi Validate 
            const { error } = portfolioValidator

            if (error) {
                //Delete file when validation failed
                if (req.file) {
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            return next(CustomErrorHandler.serverError(err.message))
                        }
                    })
                }
                return next(error)
            }
            const imageRemove = await About.findOne(
                {
                    _id: req.params.id
                }
            )
            if (!imageRemove) {
                return next(new Error('Nothing to delete'))
            }

            const imagePath = imageRemove._doc.doc
            fs.unlink(`${appRoot}/${imagePath}`, async (err) => {
                if (err) {
                    return next(CustomErrorHandler.serverError())
                }
                else {
                    //Update part
                    const { name, description, isActive } = req.body
                    let document

                    try {
                        document = await About.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {
                                name,
                                description,
                                isActive,
                                ...(req.file && { doc: filePath })
                            },
                            {
                                new: true
                            }
                        )
                    }
                    catch (error) {

                        return next(error)
                    }
                    res.status(201).json(document)
                }
            })


        })
    },
    

    //Update in social media link by ID
    async add_social_link(req, res, next) {

        const { socialId } = req.body
        let document
        try {
            document = await About.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $push: {
                        social_link: socialId
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

    //Remove Social Link
    async remove_social_link(req, res, next) {
        const { socialId } = req.body

        let document
        try {
            document = await About.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $pull: {
                        social_link: socialId
                    }
                },
                { new: true }

            )

        } catch (error) {
            return next(error)
        }
        res.status(201).json(document)
    },

    //Update in about info category by ID
    async add_info_category(req, res, next) {

        const { infoCategId } = req.body
        let document
        try {
            document = await About.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $push: {
                        info_category: infoCategId
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

    //Remove Social Link
    async remove_info_category(req, res, next) {
        const { infoCategId } = req.body

        let document
        try {
            document = await About.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $pull: {
                        info_category: infoCategId
                    }
                },
                { new: true }

            )

        } catch (error) {
            return next(error)
        }
        res.status(201).json(document)
    },

    //Delete
    async destroy(req, res, next) {
        const document = await About.findOneAndRemove(
            {
                _id: req.params.id
            }
        )
        if (!document) {
            return next(new Error('Nothing to delete'))
        }

        //doc delete from local
        const imagePath = document._doc.doc //without getter

        fs.unlink(`${appRoot}/${imagePath}`, (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError())
            }

        })
        res.json(document)
    }

}

export default aboutController