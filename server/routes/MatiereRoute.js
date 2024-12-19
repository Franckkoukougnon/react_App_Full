const express = require("express");
const router = express.Router();
const {
  getAllMatieres,
  addMatiereToClasse,
  getMatieresByClasse,
  getProfsByMatiere,
  updateProfsByMatiere,
  deleteMatiere,
} = require("../controller/MatiereController");

router.get("/", getAllMatieres);
router.post("/", addMatiereToClasse);
router.get("/:classeId", getMatieresByClasse);
router.get("/:matiereId/profs", getProfsByMatiere);
router.put("/:matiereId/profs", updateProfsByMatiere);
router.delete("/:matiereId", deleteMatiere);

module.exports = router;
