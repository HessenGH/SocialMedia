import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
// import { readdirSync } from "fs";
// config dotenv file
dotenv.config();

//rest obj
const app = express();

// server setupe
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected TO DB"))
  .catch((err) => console.log(err));

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));




//route
app.use("/api/v1/auth", authRoutes);


// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
//register


app.get("/", (req, res) => {
  res.send("<h1>Welcome to Techinfoyt</h1>");
});

//listen to port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT} `);
});