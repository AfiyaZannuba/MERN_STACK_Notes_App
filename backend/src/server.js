import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
// console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT || 5001;



//middleware
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());//this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req, res, next) => {
//     console.log("We must get a new req");
//     next();
// })

app.use("/api/notes", notesRoutes);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    });
})



