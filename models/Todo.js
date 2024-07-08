import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["easy", "middle", "hard"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false }
);

todoSchema.post("save", handleSaveError);

todoSchema.pre("findOneAndUpdate", preUpdate);

todoSchema.post("findOneAndUpdate", handleSaveError);

export const todoAddSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  level: Joi.string().valid("easy", "middle", "hard").required(),
});

export const todoUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  level: Joi.string().valid("easy", "middle", "hard"),
});

const Todo = model("todo", todoSchema);

export default Todo;
