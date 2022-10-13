const sql = require('mssql')
const getModules = async (req, res, next) => {
    try {
        const dbQuery = `select * from [Essentials].[Module]`
        const modules = await sql.query(dbQuery);
        res.status(200).json(modules.recordset);
    } catch (error) {
        next(error)
    }
}
module.exports = {getModules}