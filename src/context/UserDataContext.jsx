import { createContext, useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import { useLocation, useNavigate } from "react-router-dom";

export const UserDataContext = createContext()
export default function UserDataContextProvider({ children }) {
  const [user, setUser] = useState({ login: "", password: "" })
  const location = useLocation()
  const navigate = useNavigate()
  const arrPathname = ["/", "/registration", "/authorization"]
  useEffect(() => {
    const userId = sessionStorage.getItem("asdf")
    if (userId)
      userApi.getUser(userId).then(res => setUser(res))
    else if (!arrPathname.includes(location.pathname))
      navigate("/")
  }, [])
  return (
    <UserDataContext.Provider
      value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}