import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './pages/Register.jsx';
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import Logout from "./pages/Logout.jsx";
import RequireAuth from "./components/RequireAuth.js";
import SetAvatar from "./pages/SetAvatar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element ={<RequireAuth> <Chat/> </RequireAuth>} />
        <Route path="/register" element= {<Register/>} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/setAvatar" element= {<RequireAuth> <SetAvatar/> </RequireAuth>} />
        <Route path="/logout" element = {<Logout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
