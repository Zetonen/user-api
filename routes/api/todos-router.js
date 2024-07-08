import express from "express";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import todosController from "../../controllers/todo-controller.js";
import { validateBody } from "../../decorators/index.js";
import { todoAddSchema, todoUpdateSchema } from "../../models/Todo.js";

const todosRouter = express.Router();

todosRouter.use(authenticate);

todosRouter.get("/", todosController.getAll);
todosRouter.get("/:id", isValidId, todosController.getTodoById);

todosRouter.post(
  "/",
  isEmptyBody,
  validateBody(todoAddSchema),
  todosController.add
);
todosRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(todoUpdateSchema),
  todosController.updateById
);

todosRouter.delete("/:id", isValidId, todosController.deleteById);
export default todosRouter;
