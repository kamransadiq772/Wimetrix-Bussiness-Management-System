const sql = require('mssql')

const createUser = async (req, res, next) => {
    const { UserName, Password, UserType,LineID,SectionID,UserImageUrl,UserThumbnailUrl,ModuleID } = req.body
    if (!UserName || !Password || !UserType || !LineID || !SectionID || !ModuleID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `insert into [Essentials].[User](UserName,Password,UserType,LineID,SectionID,UserImageUrl,UserThumbnailUrl) 
        output inserted.UserID
        values ('${UserName}','${Password}','${UserType}','${LineID}','${SectionID}','${UserImageUrl}','${UserThumbnailUrl}')`
        const resp = await sql.query(dbQuery)
        const userID = resp.recordset[0].UserID
        const permissionsQuery = `insert into [Essentials].[Userpermission](UserID,ModuleID) values(${userID},${ModuleID})`
        await sql.query(permissionsQuery)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const { UserID,UserName, Password, UserType,LineID,SectionID,UserImageUrl,UserThumbnailUrl,ModuleID } = req.body
    if ( !UserID || !UserName || !Password || !UserType || !LineID || !SectionID || !ModuleID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const dbQuery = `Update [Essentials].[User] set UserName = '${UserName}', Password='${Password}',UserType='${UserType}',LineID='${LineID}',SectionID='${SectionID}',UserImageUrl='${UserImageUrl}',UserThumbnailUrl='${UserThumbnailUrl}' where UserID='${UserID}'`
        await sql.query(dbQuery);
        const removingPermissionsQuery = `delete from [Essentials].[Userpermission] where UserID='${UserID}'`
        await sql.query(removingPermissionsQuery)
        const permissionsQuery = `insert into [Essentials].[Userpermission](UserID,ModuleID) values(${UserID},${ModuleID})`
        await sql.query(permissionsQuery)
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    const UserID = req.params.id
    if(!UserID) {
        res.status(400)
        return next("Missing Fields")
    }
    try {
        const permissionsQuery = `delete from [Essentials].[Userpermission] where UserID='${UserID}'`
        await sql.query(permissionsQuery)
        const dbQuery = `delete from [Essentials].[User] where UserID=${UserID}`
        await sql.query(dbQuery);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const dbQuery = `select * from [Essentials].[User] order by UserID desc`
        const users = await sql.query(dbQuery);
        res.status(200).json(users.recordset);
    } catch (error) {
        next(error)
    }
}

module.exports = {createUser,updateUser,deleteUser,getUsers}