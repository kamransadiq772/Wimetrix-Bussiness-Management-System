const sql = require('mssql')

const createMachineType = async (req, res, next) => {
    const { MachineTypeCode, MachineTypeDescription, Allowance } = req.body
    if (!MachineTypeCode || !MachineTypeDescription || !Allowance) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `insert into Essentials.MachineType (MachineTypeCode,MachineTypeDescription,Allowance) 
        values ('${MachineTypeCode}','${MachineTypeDescription}','${Allowance}')`

        await sql.query(dbQuery)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

const updateMachineType = async (req, res, next) => {
    const { MachineTypeID, MachineTypeCode, MachineTypeDescription, Allowance } = req.body
    if (!MachineTypeID || !MachineTypeCode || !MachineTypeDescription || !Allowance) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `Update Essentials.MachineType set MachineTypeCode = '${MachineTypeCode}', MachineTypeDescription='${MachineTypeDescription}',Allowance=${Allowance} where MachineTypeID=${MachineTypeID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const deleteMachineType = async (req, res, next) => {
    const MachineTypeID = req.params.id
    if(!MachineTypeID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `delete from Essentials.MachineType where MachineTypeID=${MachineTypeID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const getMachineTypes = async (req, res, next) => {
    try {
        const dbQuery = `select * from Essentials.MachineType order by MachineTypeID desc`
        const machineTypes = await sql.query(dbQuery);
        res.status(200).json(machineTypes.recordset);
    } catch (error) {
        next(error)
    }
}

module.exports = {createMachineType,deleteMachineType,updateMachineType,getMachineTypes}