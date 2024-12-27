import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ClasseList.css"; // Importer le fichier CSS
import classService from "../../service/classeService";

const ClasseList = () => {
  const [classes, setClasses] = useState([]);
  const [editingId, setEditingId] = useState(null); // ID de la classe en cours de modification
  const [name, setName] = useState(""); // Nouveau nom de la classe

  // Charger les classes depuis l'API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await classService.getAllClasses();
        setClasses(response.data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchClasses();
  }, []);

  // Fonction pour lancer la modification
  const handleUpdateClasse = (id) => {
    if (!name.trim()) {
      alert("Le nom ne peut pas être vide.");
      return;
    }

    axios
      .put(`http://localhost:3001/classes/${id}`, { nom: name })
      .then((response) => {
        setClasses((prevClasses) =>
          prevClasses.map((classe) =>
            classe.id === id ? response.data : classe
          )
        );
        setEditingId(null); // Quitter le mode édition
        setName(""); // Réinitialiser le champ
        alert("Classe modifiée avec succès");
      })
      .catch((error) => console.error("Erreur :", error));
  };

  return (
    <div className="classe-container">
      <h2>Liste des Classes</h2>
      <ul>
        {classes.map((classe) => (
          <li key={classe.id} className="classe-item">
            {editingId === classe.id ? (
              // Si l'ID correspond, afficher le champ d'édition
              <div className="classe-edit">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nouveau nom"
                  className="classe-input"
                />
                <button
                  onClick={() => handleUpdateClasse(classe.id)}
                  className="classe-save-button"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="classe-cancel-button"
                >
                  Annuler
                </button>
              </div>
            ) : (
              // Sinon afficher la classe avec le bouton "Modifier"
              <div className="classe-display">
                <span>{classe.nom}</span>

                <span>
                  <Link to={`/classe/${classe.id}`}>Voir Plus</Link>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClasseList;
