import express  from "express";
import mongoose from "mongoose";
import cors from 'cors'
import 'dotenv/config'
import {dbConnection} from './config/db.js'

//mongodb connection
dbConnection()

const app = express()
const PORT = 8080

//routes
import { user_router } from "./routes/userRoute.js";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/auth', user_router);


app.get('/', (request, response) => {
    response.send('server started...')
})

app.listen(PORT, () => console.log('server running on port ' + PORT))