import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authenticated } from "../../store";

const Login = () => {
  const redirect = useNavigate();
  const setAuth = useSetRecoilState(authenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const credentials = {
    email,
    password
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('login', credentials);
      localStorage.setItem('tokenUser', response.data.token);
      setAuth({ check: true });
      redirect('/admin');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="bg-site bg-no-repeat bg-cover overflow-hidden grid place-items-center h-screen">
      <form
        onSubmit={login}
        className="flex-1 border rounded-2xl flex flex-col gap-y-8 pb-20 p-8 items-start"
      >
        <input
          className="bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all"
          type="email"
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all"
          type="password"
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className="btn btn-lg">Login</button>
      </form>
    </div>
  );
};

export default Login;
