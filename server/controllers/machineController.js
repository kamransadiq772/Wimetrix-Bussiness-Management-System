const sql = require('mssql')

const createMachine = async (req, res, next) => {
    const { MachineCode, MachineDescription, MachineImageUrl, MachineThumbnailUrl, MachineTypeID, ActiveWorkerID, LineID, BoxID, IsMachineDown } = req.body
    if (
           !MachineCode
        || !MachineDescription
        || !MachineTypeID
    ) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `insert into Essentials.Machine (MachineCode, MachineDescription, MachineImageUrl, MachineThumbnailUrl, MachineTypeID, ActiveWorkerID, LineID, BoxID, IsMachineDown) 
        values ('${MachineCode}','${MachineDescription}','${MachineImageUrl}','${MachineThumbnailUrl}',${MachineTypeID},${ActiveWorkerID !== 0 ? ActiveWorkerID : null },${LineID!==0?LineID:null},${BoxID!==0?BoxID:null},${IsMachineDown})`

        await sql.query(dbQuery)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

const updateMachine = async (req, res, next) => {
    const { MachineID, MachineCode, MachineDescription, MachineImageUrl, MachineThumbnailUrl, MachineTypeID, ActiveWorkerID, LineID, BoxID, IsMachineDown } = req.body
    if ( !MachineID
        || !MachineCode
        || !MachineDescription
        || !MachineTypeID
    ) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `Update Essentials.Machine set MachineCode='${MachineCode}',MachineDescription='${MachineDescription}',MachineImageUrl='${MachineImageUrl}',MachineThumbnailUrl='${MachineThumbnailUrl}', MachineTypeID=${MachineTypeID}, ActiveWorkerID=${ActiveWorkerID !== 0 ? ActiveWorkerID : null}, LineID=${LineID !== 0 ? LineID : null}, BoxID=${BoxID !== 0 ? BoxID : null}, IsMachineDown='${IsMachineDown}' where MachineID=${MachineID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const deleteMachine = async (req, res, next) => {
    const MachineID = req.params.id
    if (!MachineID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `delete from Essentials.Machine where MachineID=${MachineID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const getMachines = async (req, res, next) => {
    try {
        const dbQuery = `select * from Essentials.Machine order by MachineID desc`
        const faults = await sql.query(dbQuery);
        res.status(200).json(faults.recordset);
    } catch (error) {
        next(error)
    }
}


module.exports = { createMachine, updateMachine, deleteMachine, getMachines }