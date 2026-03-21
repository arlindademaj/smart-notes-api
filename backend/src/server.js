import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log("The server is running on http://localhost:3000");
});
