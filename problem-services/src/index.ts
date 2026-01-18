import express from "express";
const app = express();
import cors from "cors"
import problemRoute from './routes/ProblemRoutes.js'

app.use(express.json())
app.use(cors())
app.use('/api',problemRoute)

app.listen(process.env.PORT,()=>{
    console.log("running at 3000 port")
})