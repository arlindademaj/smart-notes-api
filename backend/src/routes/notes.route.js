import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNoteById,
  updateNoteById,
} from "../controllers/notes.controller.js";
import { asyncHandler } from "../utils/asyncHandler.middleware.js";
import { validateNote } from "../validators/note.validator.js";
import { aiProcess } from "../controllers/aiController.js";

const notesRouter = Router();

notesRouter.post("/", validateNote, asyncHandler(createNote));

notesRouter.get("/", asyncHandler(getAllNotes));

notesRouter.get("/:id", asyncHandler(getNoteById));

notesRouter.delete("/:id", asyncHandler(deleteNoteById));

notesRouter.put("/:id", asyncHandler(updateNoteById));

notesRouter.post("/ai-process", aiProcess);

export default notesRouter;
