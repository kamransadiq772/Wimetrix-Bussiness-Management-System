const sql = require('mssql')

const getSections = async (req, res, next) => {
    try {
        const dbQuery = `select * from Essentials.Section`
        const faults = await sql.query(dbQuery);
        res.status(200).json(faults.recordset);
    } catch (error) {
        next(error)
    }
}

module.exports={getSections}