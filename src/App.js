import { Routes as Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";

const App = () => {
  return (

          <AuthContextProvider>
          <Switch>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Switch>
          </AuthContextProvider>

  );
};

export default App;
