import { useContext, useState } from "react"
import { userApi } from "../../api/userApi"
import styles from "./Authorization.module.css"
import { UserDataContext } from "../../context/UserDataContext"
import { useNavigate } from "react-router-dom"
import { ServerErrors } from "../../types/enums"
import type { User } from "../../types/User"
export default function Authorization() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)
  const [error, setError] = useState<string>(" ")
  const errorMessages: { [key in ServerErrors]?: string } = {
    [ServerErrors.emptyFields]: "fill in the fields",
    [ServerErrors.notFound]: "incorrect login or password"
  }
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input className={styles.login} type="text" placeholder="login" id="inpLogin" />
        <input className={styles.password} type="password" placeholder="password" id="inpPassword" />
        <p className={styles.error}>{error}</p>
        <button onClick={event => {
          event.preventDefault()
          const user = {
            login: (document.getElementById("inpLogin") as HTMLInputElement).value.trim(),
            password: (document.getElementById("inpPassword") as HTMLInputElement).value.trim()
          }
          if (!user.login || !user.password) {
            setError(errorMessages[ServerErrors.emptyFields] as string)
            return
          }
          userApi.authorizeUser(user).then(response => {
            if (response.error !== undefined)
              setError(errorMessages[response.error] as string)
            else {
              const newUser: User = response as User
              sessionStorage.setItem("asdf", newUser.id)
              setUser(newUser)
              navigate("/main")
            }
          })
        }} className={styles.submit}>submit</button>
      </form>
    </div>
  )
}