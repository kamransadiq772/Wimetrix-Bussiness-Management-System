const sql = require('mssql')

const createLine = async (req, res, next) => {
    const { LineCode, LineDescription } = req.body
    if (!LineCode || !LineDescription) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `insert into Essentials.Line (LineCode,LineDescription) 
        values ('${LineCode}','${LineDescription}')`
        await sql.query(dbQuery)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

const updateLine = async (req, res, next) => {
    const { LineID, LineCode, LineDescription } = req.body
    if (!LineID || !LineCode || !LineDescription ) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `Update Essentials.Line set LineCode = '${LineCode}', LineDescription='${LineDescription}' where LineID=${LineID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const deleteLine = async (req, res, next) => {
    const LineID = req.params.id
    if(!LineID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `delete from Essentials.Line where LineID=${LineID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const getLines = async (req, res, next) => {
    try {
        const dbQuery = `select * from Essentials.Line order by LineID desc`
        const lines = await sql.query(dbQuery);
        res.status(200).json(lines.recordset);
    } catch (error) {
        next(error)
    }
}

module.exports = {createLine,updateLine,deleteLine,getLines}
