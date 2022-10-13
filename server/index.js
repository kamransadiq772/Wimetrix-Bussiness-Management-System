const express = require('express')
const cors = require('cors')
const {notfound,errorHandler} = require('./middlewares/errorMiddleware')
const {connection} = require('./db/connection')
const faultRoute = require('./routes/faultRoute')
const lineRoute = require('./routes/lineRoute')
const machineTypeRoute = require('./routes/machineType')
const machineRoute = require('./routes/machineRoute')
const workerRoute = require('./routes/workerRoute')
const authRoute = require('./routes/authRoutes')
const sectionRoute = require('./routes/sectionRoute')
const boxRoute = require('./routes/boxRoutes')
const userRoute = require('./routes/userRoutes')
const moduleRoute = require('./routes/moduleRoutes')
const {access} = require('./middlewares/accessMiddleware')

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerSpec = YAML.load('./swagger/api.yaml')


const app = express()

app.use(cors())
app.use(express.json())
connection(app)


app.use('/swagger',swaggerUI.serve,swaggerUI.setup(swaggerSpec,{explorer:true}))

app.get('/',(req,res)=>res.send("Hello World"))
app.use('/api/fault',faultRoute)
app.use('/api/line',lineRoute)
app.use('/api/machineType',machineTypeRoute)
app.use('/api/machine',machineRoute)
app.use('/api/worker',workerRoute)
app.use('/api/auth',authRoute)
app.use('/api/section',sectionRoute)
app.use('/api/box',boxRoute)
app.use('/api/user',userRoute)
app.use('/api/module',moduleRoute)



app.use(notfound)
app.use(errorHandler) 

module.exports = {app}