import { Children, createContext, useState,useEffect } from "react";
import { useNavigate,useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [user,setUser] = useState(null);


    useEffect(() => {
        // checkUserLoggedIn();
      }, []);
    
      // check if the user is logged in.
      const checkUserLoggedIn = async () => {
        try {
          const res = await fetch(`http://localhost:8800/api/auth/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const result = await res.json();
          if (!result.error) {
            if (
              location.pathname === "/login" ||
              location.pathname === "/register"
            ) {
              setTimeout(() => {
                navigate("/home", { replace: true });
              }, 500);
            } 
            // else {
            //   navigate(location.pathname ? location.pathname : "/home");
            // }
            setUser(result);
          } else {
            navigate("/login", { replace: true });
          }
        } catch (err) {
          console.log(err);
        }
      };

    //login request

    const loginUser = async(userData)=>{
        try{
            const res = await fetch(`http://localhost:8800/api/auth/login`,{
                method: "POST",
                headers :{
                    "content-type" : "application/json",
                },
                body: JSON.stringify({...userData})
            });
            const result = await res.json();
            if(!result.error){
                localStorage.setItem("token",result.token );
                console.log(result);
                localStorage.getItem("token");
                setUser(result.user);
                navigate('/home');
            }
            else{
                console.log(result.error);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    //register

    const registerUser = async(userData)=>{

        try{
            const res = await fetch(`http://localhost:8800/api/auth/register`,{
                method:"POST",
                headers :{
                    "content-type" : "application/json",
                },
                body: JSON.stringify({...userData})
            });
            const result = await res.json();
            console.log(result);
        }
        catch(err){
            console.log(err);
        }
    }

    return <AuthContext.Provider value={{ loginUser,registerUser,user,setUser }}>{children}</AuthContext.Provider>
};

export default AuthContext;