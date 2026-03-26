
import "./App.css";
import { Routes, Route,Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";

import Navbar from "./components/Navbar";
import { useUser } from "./context/UserContext";

function App() {

  //bring in user info
  const {user} = useUser()
  console.log(user)
  // useEffect(() => {
    //   async function getData(){
    //     const response = await fetch('http://localhost:3000')
    //     const data = await response.json()
    //     console.log(data)
    //   }
    //   getData()
  // }, []);
  return (
    <>
      <Navbar />
      {user ?
      <Routes>
        <Route path="/feed" element={<Feed />}/>
        <Route path="*" element={<Navigate to="/feed" />} />
      </Routes>

    :
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />}   />
      </Routes>
    }
    </>
  );
}

export default App;
