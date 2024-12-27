import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import eleveService from "../../service/eleveService";

const ClasseDetail = () => {
  const { classeId } = useParams();
  const [eleves, setEleves] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchClasseDetail = useCallback(async () => {
    try {
      const response = await eleveService.getElevesByClasse(classeId);
      console.log("liste d'eleve :", response.data);
      setEleves(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur :", error);
      setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
      setLoading(false);
    }
  }, [classeId]);

  useEffect(() => {
    fetchClasseDetail();
  }, [fetchClasseDetail]);

  if (loading) return <p>Chargement des détails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Liste des élèves</h2>
      {eleves.length > 0 ? (
        <ul>
          {eleves.map((eleve) => (
            <li key={eleve.id}>{eleve.name}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun élève trouvé pour cette classe.</p>
      )}
    </div>
  );
};

export default ClasseDetail;
