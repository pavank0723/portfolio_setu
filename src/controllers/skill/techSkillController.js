import { TechSkill } from "../../models"
import CustomErrorHandler from "../../services/CustomErrorHandler"
import fs from "fs"
import { skillSchema } from "../../validations/skillValidator"
import path from "path"
import multer from "multer"

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => cb(null, "uploads/skills/"),
        filename: (req, file, cb) => {
            const uniqueName = `skill_${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
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
).single('image')

const techSkillController = {
    //Create
    async store(req, res, next) {

        //Multipart form data --==> install multer to handling multi data
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message))
            } 
            // console.log(req.body)
            const filePath = req.file.path.replace(/\\/g,"/")

            // var newFilePath = filePath.split('\\').join('/')
            console.log('==>>>>>>>', filePath)


            //Validation from productValidator

            //==--->> 2. Joi Validate if error
            const { error } = skillSchema.validate(req.body)
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
            const { title, subtitle } = req.body
            let document

            try {
                document = await TechSkill.create(
                    {
                        title,
                        subtitle,
                        image: filePath
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
            documents = await TechSkill.find().select('-updatedAt -__v').sort(
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
            document = await TechSkill.findOne(
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
            const skillValidator = skillSchema.validate(req.body)

            //Joi Validate 
            const { error } = skillValidator

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
            const imageRemove = await TechSkill.findOne(
                {
                    _id: req.params.id
                }
            )
            if (!imageRemove) {
                return next(new Error('Nothing to delete'))
            }

            const imagePath = imageRemove._doc.image
            fs.unlink(`${appRoot}/${imagePath}`, async (err) => {
                if (err) {
                    return next(CustomErrorHandler.serverError())
                }
                else {
                    //Update part
                    const { title, subtitle } = req.body
                    let document

                    try {
                        document = await TechSkill.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {
                                title,
                                subtitle,
                                ...(req.file && { image: filePath })
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

    //Delete
    async destroy(req, res, next) {
        const document = await TechSkill.findOneAndRemove(
            {
                _id: req.params.id
            }
        )
        if (!document) {
            return next(new Error('Nothing to delete'))
        }

        //image delete from local
        const imagePath = document._doc.image //without getter

        fs.unlink(`${appRoot}/${imagePath}`, (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError())
            }

        })
        res.json(document)
    }

}

export default techSkillController