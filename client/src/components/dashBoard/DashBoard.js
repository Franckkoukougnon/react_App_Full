import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";

const DashBoard = () => {
  const [name, setName] = useState("");
  const [classe, setClasses] = useState([]);
  const navigate = useNavigate(); // Remplace useHistory
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer toutes les classes au démarrage
  useEffect(() => {
    axios
      .get("http://localhost:3001/classes")
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Créer une nouvelle classe
  const handleCreateClasse = () => {
    axios
      .post("http://localhost:3001/classes", { nom: name })
      .then((response) => {
        setClasses([...classe, response.data]);
        setName("");
        alert("Classe créée avec succès");
        navigate("/classelist");
      })
      .catch((error) => console.error(error));
  };

  // Supprimer une classe
  const handleDeleteClasse = (id) => {
    axios
      .delete(`http://localhost:3001/classes/${id}`)
      .then(() => {
        setClasses(classe.filter((classe) => classe.id !== id));
        alert("Classe supprimée avec succès");
      })
      .catch((error) => console.error(error));
  };

  // Update une classe
  const handleUpdateClasse = (id) => {
    // Vérifier que le champ 'name' n'est pas vide
    if (!name.trim()) {
      alert("Le champ nom ne peut pas être vide.");
      return;
    }

    // Ajouter un état de chargement si nécessaire
    setIsLoading(true);

    axios
      .put(`http://localhost:3001/classes/${id}`, { nom: name })
      .then((response) => {
        // Mettre à jour l'état des classes avec la classe modifiée
        setClasses((prevClasses) =>
          prevClasses.map((classe) =>
            classe.id === id ? response.data : classe
          )
        );
        // Réinitialiser le champ name
        setName("");
        alert("Classe modifiée avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la modification :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      })
      .finally(() => {
        // Désactiver l'état de chargement
        setIsLoading(false);
      });
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de la classe"
        />
        <button type="submit" onClick={handleCreateClasse}>
          Créer une classe
        </button>
      </div>
      <div>
        <h2>Liste des classes</h2>
        <ul>
          {classe.map((classe) => (
            <li key={classe.id}>
              {classe.nom}
              <div className="actions">
                <button onClick={() => handleDeleteClasse(classe.id)}>
                  Supprimer
                </button>
                <button
                  onClick={() => handleUpdateClasse(classe.id)}
                  disabled={isLoading}
                >
                  {isLoading ? "Modification..." : "Modifier"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
