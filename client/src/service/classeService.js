import axios from "axios";

// Crée une instance Axios
const apiInstance = axios.create({
  baseURL: "http://localhost:3001/classes", // URL de l'API
});

// Service CRUD
const getAllClasses = () => {
  return apiInstance.get("/");
};

const getSingleClass = (id) => {
  return apiInstance.get(`/${id}`);
};

const createClass = (data) => {
  return apiInstance.post("/", data);
};

const updateClass = (id, data) => {
  return apiInstance.put(`/${id}`, data);
};

const deleteClass = (id) => {
  return apiInstance.delete(`/${id}`);
};

// Regroupement des méthodes
const classService = {
  getAllClasses,
  getSingleClass,
  createClass,
  updateClass,
  deleteClass,
};

export default classService;
