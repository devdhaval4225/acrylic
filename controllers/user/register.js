const User = require("../../models/users.model");
const Joi = require("joi");
const errorMessages = require("../../common/errorMessage");
const commonFunction = require("../../common/commonFunction");


exports.register = async (req, res) => {
    try {
        await registerValidationSchema.validate(req.body);
        
        const { email, password,name } = req.body;
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            res.status(400).json({
                message: errorMessages.EMAIL_EXISTS,
            })
        }
        const uID = await commonFunction.uniqueNumber('user');

        const insertUser = new User({
            userId: uID,
            name:name,
            email: email,
            password: password
        });
        await insertUser.save();

        const findUser = await User.findOne({ userId: uID }).select([
            "userId",
            "name",
            "email",
            "createdAt",
            "updatedAt",
        ]);


        res.status(201).json({
            message: "user insert sucessfully",
            status: 201,
            data: findUser
        })

    } catch (error) {
        console.log("::user-insert-ERROR::", error);
        res.status(500).json({
            message: errorMessages.DATABASE_INTERNAL,
            status: 500
        })
    }
}

const registerValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .error(new Error(errorMessages.NAME_ISSUE))
        .required(),
    email: Joi.string()
        .min(3)
        .max(100)
        .email({ tlds: { allow: false } })
        .error(new Error(errorMessages.EMAIL_NOT_VALID))
        .required(),
    password: Joi.string()
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'))
        .error(new Error(errorMessages.STRONG_PASSWORD))
        .required(),
})