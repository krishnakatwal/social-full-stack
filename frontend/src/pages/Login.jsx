import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userClient } from "../clients/api";

import {useUser} from "../context/UserContext.jsx"

function Login() {

  // bring in the setter function from the context
    const  {setUser} = useUser()

    const navigate = useNavigate()

    // console.log(value)

  const [form, setForm] = useState({
  
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(form);
    try {
      //send the form data to our backeend
      const { data } = await userClient.post("/login", form);
    //   console.log(data);

      //take the token and store it locally
      localStorage.setItem("token", data.token);

      //  save some user data in our state
      setUser(data.user)

      // take the user to a different page
      navigate("/feed")

    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  
  return (
    <div>
      <h1> Login page</h1>
      <form onSubmit={handleSubmit}>
       

        <label htmlFor="email">Email:</label>
        <input
          value={form.email}
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          value={form.password}
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          required
        />

        <button>Login</button>
        
      </form>
    </div>
  );
}
export default Login;
