const sql = require('mssql')

const createFault = async (req, res, next) => {
    const { FaultCode, FaultDescription, SectionID } = req.body
    if (!FaultCode || !FaultDescription || !SectionID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `insert into Essentials.Fault (FaultCode,FaultDescription,SectionID) 
        values ('${FaultCode}','${FaultDescription}',${SectionID})`
        // values (${FaultCode},${FaultDescription},${SectionID})`

        await sql.query(dbQuery)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

const updateFault = async (req, res, next) => {
    const { FaultID, FaultCode, FaultDescription, SectionID } = req.body
    if (!FaultID || !FaultCode || !FaultDescription || !SectionID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `Update Essentials.Fault set FaultCode = '${FaultCode}', FaultDescription='${FaultDescription}',SectionID=${SectionID} where FaultID=${FaultID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const deleteFault = async (req, res, next) => {
    const FaultID = req.params.id
    if(!FaultID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `delete from Essentials.Fault where FaultID=${FaultID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const getFaults = async (req, res, next) => {
    try {
        const dbQuery = `select * from Essentials.Fault order by FaultID desc`
        const faults = await sql.query(dbQuery);
        res.status(200).json(faults.recordset);
    } catch (error) {
        next(error)
    }
}



module.exports = { createFault,updateFault,getFaults,deleteFault }