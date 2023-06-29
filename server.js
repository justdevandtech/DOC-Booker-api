import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 8080;

//routes
import { user_router } from "./routes/userRoute.js";
import { doctor_router } from "./routes/doctorRoute.js";

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", user_router);
app.use("/api/doctor", doctor_router);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to DOC-Booker API",
  });
});

//Connect to the database before listening
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests on port " + PORT);
  });
});
