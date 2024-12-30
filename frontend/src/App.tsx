import React from "react";
import Home from "./pages/Home/Home";

import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
