import axios from "axios";

//creation d'une instance Axios
const apiInstance = axios.create({
  baseURL: "http://localhost:3001/eleves", // URL de l'API
});

// Service CRUD
const getAllEleves = () => {
  return apiInstance.get("/");
};

const getSingleEleve = (id) => {
  return apiInstance.get(`/${id}`);
};

const getElevesByClasse = (classeId) => {
  return apiInstance.get(`/${classeId}`);
};

const createEleve = (data) => {
  return apiInstance.post("/", data);
};

const updateEleve = (id, data) => {
  return apiInstance.put(`/${id}`, data);
};

const deleteEleve = (id) => {
  return apiInstance.delete(`/${id}`);
};

// Regroupement des méthodes
const eleveService = {
  getAllEleves,
  getSingleEleve,
  getElevesByClasse,
  createEleve,
  updateEleve,
  deleteEleve,
};

export default eleveService;
