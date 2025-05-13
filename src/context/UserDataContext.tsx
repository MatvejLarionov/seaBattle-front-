import { createContext, useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import type { JSX } from 'react'
import type { User } from "../types/User";
export const UserDataContext = createContext
  <{ user: User, setUser: React.Dispatch<React.SetStateAction<User>> } | null>(null) as
  React.Context<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
  }>
export default function UserDataContextProvider({ children }: { children?: JSX.Element | string }) {
  const [user, setUser] = useState<User>({ login: "", id: "" })
  const location = useLocation()
  const navigate = useNavigate()
  const arrPathname = ["/", "/registration", "/authorization"]
  useEffect(() => {
    const userId = sessionStorage.getItem("asdf")
    if (userId) {
      userApi.getUser(userId).then(res => setUser(res as User))
      return
    }

    if (!arrPathname.includes(location.pathname))
      navigate("/")
  }, [])
  return (
    <UserDataContext.Provider
      value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}