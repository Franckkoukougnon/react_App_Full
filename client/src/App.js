import React from "react";
import ClasseList from "./components/classeList/ClasseList";
import Dashboard from "./components/dashBoard/DashBoard";
import Navbar from "./components/Navbar/Navbar";
import ClasseDetail from "./pages/classeDetail/ClasseDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* La navbar est toujours visible */}
        <h1>Mon Application</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/classelist" element={<ClasseList />} />
          <Route path="/classe/:classeId" element={<ClasseDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
