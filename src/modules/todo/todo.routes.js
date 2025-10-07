const express = require("express");
const router = express.Router();
const TodoController = require("./todo.controller");
const auth = require("../../common/middlewares/auth.middleware");

router.post("/add", auth, TodoController.create);
router.get("/list", auth, TodoController.list);
router.put("/update/:id", auth, TodoController.update);
router.delete("/delete/:id", auth, TodoController.delete);

module.exports = router;
