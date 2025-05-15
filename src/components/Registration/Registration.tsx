import { useContext, useState } from "react"
import { userApi } from "../../api/userApi"
import styles from "./Registration.module.css"
import { UserDataContext } from "../../context/UserDataContext"
import { useNavigate } from "react-router-dom"
import { ServerErrors } from "../../types/enums"
import type { User, UserForServer } from "../../types/User"
export default function Registration() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)
  const [error, setError] = useState(" ")
  const errorMessages: { [key in ServerErrors]?: string } = {
    [ServerErrors.loginRepeat]: "such login already exists",
    [ServerErrors.emptyFields]: "fill in the fields",
    [ServerErrors.passwordIsNotCorrect]: "The password must contain a symbol other than numbers and its size must be greater than eight"
  }
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input className={styles.login} type="text" placeholder="login" id="inpLogin" />
        <input className={styles.password} type="password" placeholder="password" id="inpPassword" />
        <p className={styles.error}>{error}</p>
        <button onClick={event => {
          event.preventDefault()
          const user: UserForServer = {
            login: (document.getElementById("inpLogin") as HTMLInputElement).value.trim(),
            password: (document.getElementById("inpPassword") as HTMLInputElement).value.trim()
          }
          if (!user.login || !user.password) {
            setError(errorMessages[ServerErrors.emptyFields] as string)
            return
          }
          userApi.registerUser(user).then(response => {
            if ("error" in response)
              setError(errorMessages[response.error] as string)
            else {
              const newUser: User = response
              sessionStorage.setItem("asdf", newUser.id)
              setUser(newUser)
              navigate("/main")
            }
          })
        }} className={styles.submit}>submit</button>
      </form>
    </div >
  )
}