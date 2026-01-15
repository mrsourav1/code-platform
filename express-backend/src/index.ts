import express from "express";
import { createClient } from "redis";
const app = express();
const client = createClient();
client.connect();

app.use(express.json())

app.post("/submit",(req,res)=>{
    
})

app.listen(3000,()=>{
    console.log("running at 3000 port")
})