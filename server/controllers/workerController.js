const sql = require('mssql')

const createWorker = async (req, res, next) => {
    const { WorkerCode, WorkerDescription, WorkerImageUrl, WorkerThumbnailUrl, TodayCheckin, TodayProduction } = req.body
    if (!WorkerCode || !WorkerDescription ) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `insert into Essentials.Worker (WorkerCode,WorkerDescription,WorkerImageUrl,WorkerThumbnailUrl,TodayCheckin,TodayProduction) 
        values ('${WorkerCode}','${WorkerDescription}','${WorkerImageUrl}','${WorkerThumbnailUrl}','${TodayCheckin ?? ""}','${TodayProduction}')`

        await sql.query(dbQuery)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

const updateWorker = async (req, res, next) => {
    const { WorkerID, WorkerCode, WorkerDescription, WorkerImageUrl, WorkerThumbnailUrl, TodayCheckin, TodayProduction } = req.body
    if ( !WorkerID || !WorkerCode || !WorkerDescription ) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `Update Essentials.Worker set WorkerCode='${WorkerCode}', WorkerDescription='${WorkerDescription}', WorkerImageUrl='${WorkerImageUrl}', WorkerThumbnailUrl='${WorkerThumbnailUrl}', TodayCheckin='${TodayCheckin ?? ""}', TodayProduction='${TodayProduction}' where WorkerID=${WorkerID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const deleteWorker = async (req, res, next) => {
    const WorkerID = req.params.id
    if(!WorkerID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `delete from Essentials.Worker where WorkerID=${WorkerID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const getWorkers = async (req, res, next) => {
    try {
        const dbQuery = `select * from Essentials.Worker order by WorkerID desc`
        const faults = await sql.query(dbQuery);
        res.status(200).json(faults.recordset);
    } catch (error) {
        next(error)
    }
}


module.exports = {createWorker,updateWorker,deleteWorker,getWorkers}