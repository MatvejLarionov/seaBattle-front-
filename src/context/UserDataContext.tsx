import { createContext, useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import type { JSX } from 'react'
import type { User } from "../types/User";
import Loader from "../components/Loader/Loader";
export const UserDataContext = createContext
  <{ user: User, setUser: React.Dispatch<React.SetStateAction<User>> } | null>(null) as
  React.Context<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
  }>
export default function UserDataContextProvider({ children }: { children?: JSX.Element | string }) {
  const [user, setUser] = useState<User>({ login: "", avatar: "", id: "" })
  const location = useLocation()
  const navigate = useNavigate()
  const arrPathname = ["/", "/registration", "/authorization"]
  const redirectToTitle = (): void => {
    if (!arrPathname.includes(location.pathname))
      navigate("/")
  }
  useEffect(() => {
    const userId = sessionStorage.getItem("asdf")
    if (!userId) {
      redirectToTitle()
      return
    }

    userApi.getUser(userId).then(data => {
      if ("error" in data) {
        redirectToTitle()
        return
      }
      setUser(data)
    })
  }, [])
  return (
    user.id || arrPathname.includes(location.pathname) ?
      <UserDataContext.Provider
        value={{ user, setUser }}>
        {children}
      </UserDataContext.Provider>
      :
      <Loader style={{ width: "200px", height: "200px", margin: "10vh auto"}}/>
  )
}