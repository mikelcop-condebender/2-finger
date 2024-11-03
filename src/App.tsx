import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Notes } from "./notes";
import { Navigation } from "./components/Navigation";
import Battleship from "./Battleship";
import { Designs } from "./sample_designs/Designs";
import DesignDetail from "./sample_designs/DesignDetail";
import { Home } from "./home/Home";

const App: React.FC = () => {
  return (
    <div className="app capitalize">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/batleship" element={<Battleship />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/design/:id" element={<DesignDetail />} />{" "}
      </Routes>
    </div>
  );
};

export default App;
