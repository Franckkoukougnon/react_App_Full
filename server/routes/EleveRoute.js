const express = require("express");
const router = express.Router();
const {
  getAllEleves,
  addEleveToClasse,
  getElevesByClasse,
  updateEleve,
  deleteEleve,
} = require("../controller/EleveController");

// Route pour récupérer tous les élèves
router.get("/", getAllEleves);

// Route pour ajouter un élève à une classe
router.post("/add", addEleveToClasse);

// Route pour récupérer tous les élèves d'une classe
router.get("/:classeId", getElevesByClasse);

//Route pour mettre a jour
router.put("/:id", updateEleve);

//Route pour supprimer
router.delete("/:id", deleteEleve);

module.exports = router;
