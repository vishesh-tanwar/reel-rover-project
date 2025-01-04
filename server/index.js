import express from 'express'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv' ;
import Db from './connection/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config()

const app = express() 
app.use(cookieParser()) ;
app.use(express.json())

app.use(cors({
    origin : "http://localhost:3000" , 
    credentials : true 
})) 

// app.use(cors({
//     origin : "https://reels-rover-ui.onrender.com" , 
//     credentials : true 
// })) 

app.use('/user',userRoutes);

app.listen(9000,async()=>{ 
    await Db() ;
    console.log('server is ON !!!!!'); 
}) 