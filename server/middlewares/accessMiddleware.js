const jwt = require('jsonwebtoken')
const sql = require('mssql')
const asyncHandler = require('express-async-handler')

const access = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, "kamran")
            const dbQuery = `select * from [Essentials].[User] where UserID=${decoded.id}`
            const data = await sql.query(dbQuery)
            req.user = data.recordset[0]
            next()
        } catch (error) {
            res.status(401)
            throw new Error("No Token, no Authorization")
        }
    } else {
        res.status(401)
        throw new Error("No Token, no Authorization")
    }
})

module.exports = {access}