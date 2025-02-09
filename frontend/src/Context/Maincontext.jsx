import {createContext, useState} from "react";
// import axiosClient from "../Axios/Axios-client";

export const MainContext = createContext();

export default function AppProvider({children}) {
const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
const [user,setUser] = useState({});

const setToken = (token)=> {
  _setToken(token)
  if(token){
    localStorage.setItem('ACCESS_TOKEN',token);
  }else{
    localStorage.removeItem('ACCESS_TOKEN');
  }

}
  return (
    <MainContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
    }}>
        {children}
    </MainContext.Provider>
  
  );
}