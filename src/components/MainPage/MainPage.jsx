import { useContext } from "react"
import { UserDataContext } from "../../context/UserDataContext"

export default function MainPage() {
  const { user, setUser } = useContext(UserDataContext)
  return (
    <div>{user.login}</div>
  )
}