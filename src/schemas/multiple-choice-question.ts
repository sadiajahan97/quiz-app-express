import mongoose from "mongoose";

export const mcqSchema = new mongoose.Schema({
  answer: String,
  question: String,
});
