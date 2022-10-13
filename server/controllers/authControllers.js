const sql = require('mssql')
const {generateToken} = require('../helpers/authHelper')
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const dbQuery = `select * from [Essentials].[User] where UserName = '${email}' and Password = '${password}'`
        const user = await sql.query(dbQuery);
        if (user.recordset.length === 0 ) {
            res.status(400)
            return next('Invalid Credential')
        }
        const { Password, ...info } = user.recordset[0]
        const token = generateToken(info.UserID)
        // console.log(token);
        res.status(200).json({...info,token})
    }
    catch (error) {
        next(error)
    }
}

module.exports = { login }