import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

//------Components--------//
import Header from "./Components/Header";
import Home from "./Components/Home";
import Articles from "./Components/Articles";
// import NavigationBar from "./Components/NavigationBar";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        {/* <NavigationBar /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Articles" element={<Articles />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
