const express = require("express");
const router = express.Router();
const {
  getAllEleves,
  addEleveToClasse,
  getElevesByClasse,
} = require("../controller/EleveController");

// Route pour récupérer tous les élèves
router.get("/", getAllEleves);

// Route pour ajouter un élève à une classe
router.post("/add", addEleveToClasse);

// Route pour récupérer tous les élèves d'une classe
router.get("/:classeId", getElevesByClasse);

module.exports = router;
