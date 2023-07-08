import Tobar from "./components/topbar/Tobar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const{user}=useContext(Context)
  return (
    <>
<Tobar/>

<Routes>
  <Route path="/"  element={<Home/>}/>
  {user?<Route path="/register"  element={<Home/>}/>: <Route path="/register" element={<Register/>}/>   }
  {user?<Route path="/login"  element={<Home/>}/>: <Route path="/login" element={<Login/>}/>   }
  {user?<Route path="/settings"  element={<Settings/>}/> : <Route path="/settings" element={<Login/>}/>   }
  {user? <Route path="/write"  element={<Write/>}/> :<Route path="/write"  element={<Login/>}/>}
    <Route path="/post/:postid"  element={<Single/>}/>



</Routes>


      

    </>
    
  );
}

export default App;
