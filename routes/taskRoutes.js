const express = require("express");
const { createTask , getTasks ,  getTaskById,} = require("../controllers/taskController");
const protect =  require("../middleware/authMiddleware");

const router = express.Router();

router.post("/" , protect , createTask );
router.get("/" , protect , getTasks);
router.get("/:id", protect, getTaskById);
module.exports = router;