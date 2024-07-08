import { ctrlWrapper } from "../decorators/index.js";
import {HttpError} from "../helpers/index.js";
import Todo from "../models/Todo.js";

const getAllTodo = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Todo.find({ owner });
  res.json(result);
};
const getTodoById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Todo.findOne({ _id, owner });
  if (!result) {
    throw HttpError(404, `Movie with id=${_id} not found`);
  }
  res.json(result);
};
const addTodo = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Todo.create({ ...req.body, owner });

  res.status(201).json(result);
};
const updateById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await Todo.findByIdAndUpdate({ _id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Movie with id=${_id} not found`);
  }
  res.json(result);
};
const deleteById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Todo.findByIdAndDelete({ _id, owner });

  if (!result) {
    throw HttpError(404, `Movie with id=${_id} not found`);
  }
  res.json({ message: "Delete success" });
};

export default {
  getAll: ctrlWrapper(getAllTodo),
  getTodoById: ctrlWrapper(getTodoById),
  add: ctrlWrapper(addTodo),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
