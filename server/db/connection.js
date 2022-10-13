const sql = require('mssql')
const config = require('../config/development.json')
const port = 4000

const connection = (app) => {
    sql.connect(config.sqlConfig,(err)=>{
        if(err) throw err;
        else{
            console.log("connected");
            app.listen(port, () => console.log(`Example app listening on port ${port}!`))
        }
    })
}

module.exports = {connection}