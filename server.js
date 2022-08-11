import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { dbConnection } from "./config/db.js";

//mongodb connection
dbConnection();

const app = express();
const PORT = process.env.PORT || 8080;

//routes
import { user_router } from "./routes/userRoute.js";
import { doctor_router } from "./routes/doctorRoute.js";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", user_router);
app.use("/api/doctor", doctor_router);


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to DOC-Booker API"
    })
})

app.listen(PORT, () => console.log("server running on port " + PORT));
