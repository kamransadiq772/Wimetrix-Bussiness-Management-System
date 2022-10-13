const sql = require('mssql')

const getBoxes = async(req,res)=>{
    try {
        const dbQuery = `select * from Essentials.Box`
        const boxes = await sql.query(dbQuery);
        res.status(200).json(boxes.recordset);
    } catch (error) {
        next(error)
    }
}
module.exports={getBoxes}