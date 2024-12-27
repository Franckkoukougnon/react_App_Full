const express = require("express");
const router = express.Router();
const {
  getAllProfs,
  addProfToClasse,
  getProfsByClasse,
  updateProf,
  deleteProf,
} = require("../controller/ProfController");

router.get("/", getAllProfs);
router.post("/:classeId", addProfToClasse);
router.get("/:classeId", getProfsByClasse);
router.put("/:id", updateProf);
router.delete("/:id", deleteProf);

module.exports = router;
