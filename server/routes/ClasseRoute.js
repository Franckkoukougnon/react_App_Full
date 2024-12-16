const express = require("express");
const router = express.Router();
const {
  allClasses,
  classeById,
  createClasse,
  updateClasse,
  deleteClasse,
} = require("../controller/ClasseController");

router.get("/", allClasses);
router.get("/:id", classeById);
router.post("/", createClasse);
router.put("/:id", updateClasse);
router.delete("/:id", deleteClasse);

module.exports = router;
