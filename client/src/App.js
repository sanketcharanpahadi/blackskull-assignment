import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/user/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
