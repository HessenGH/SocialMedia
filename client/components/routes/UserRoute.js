import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../Spinner";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
//   const router = useRouter();
  const [state] = useContext(UserContext);
  useEffect(() => {
    const getCurrentUser = async () => {
        
          const res = await axios.get('http://localhost:8080/api/v1/auth/user-auth')
            if (res.data.ok) {
                setOk(true);
              } else {
                setOk(false);
              }       
      };
 if(state?.token) getCurrentUser();
  },[state?.token])

  return !ok ? <Spinner /> : <>{children}</>;
  
};

export default UserRoute;