import React from "react";
import Home from "./pages/Home/Home";

import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
<Route path="/auth/login" element={<LoginPage />} />
<Route path="/auth/signup" element={<SignupPage />} />
        <Route element={
              <>
                <ProtectedRoutes />
              </>
            }>

<Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
