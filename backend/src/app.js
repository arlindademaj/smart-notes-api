import { notFound } from "./middleware/notFound.middleware.js";
import express from "express";
import notesRouter from "./routes/notes.route.js";
import { logger } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Hello Arlind");
});

app.use(notFound);

app.use(errorHandler);

export default app;
