import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/chats" element={<Chat />} />
    </Routes>
  );
}

export default App;
