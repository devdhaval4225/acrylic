require("dotenv").config();
const jwt = require("jsonwebtoken");
const user = require("../models/users.model");
const errorMessage = require("../common/errorMessage");
const commonFunction = require("../common/commonFunction");

exports.verifyUser = async (req, res, next) => {
    try {

        const Token = req.cookies.jwt;
        if (Token) {

            const decoded = await jwt.verify(Token, process.env.USER_AUTH_TOKEN);
            const decryptUid = await commonFunction.decrypt(decoded.data);
            const data = await user.findOne({ userId: decryptUid });

            if (data) {
                const decryptToken = data.tokens.filter((v) => v.token == Token)[0]["token"];
                req.user = data;
                if (Token == decryptToken) {
                    next();
                }
                else {
                    res.status(401).json({
                        message: errorMessage.UNAUTHORIZED,
                        status: 401
                    })
                }

            }
            else {
                res.status(404).json({
                    message: errorMessage.USER_NOT_VALID,
                    status: 404
                })

            }
        } else {

            res.status(403).json({
                message: errorMessage.LOGIN_AGAIN,
                status: 403
            })

        }
    } catch (error) {

        console.log("ERROR::", error);
        res.status(500).json({
            message: errorMessage.DATABASE_INTERNAL,
            status: 500
        })

    }
}

