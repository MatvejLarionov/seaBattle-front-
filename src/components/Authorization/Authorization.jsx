import { useContext, useState } from "react"
import { userApi } from "../../api/userApi"
import styles from "./Authorization.module.css"
import { UserDataContext } from "../../context/UserDataContext"
import { useNavigate } from "react-router-dom"
export default function Authorization() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)
  const [error, setError] = useState(" ")
  const errorMessages = {
    emptyFields: "fill in the fields",
    notFound: "incorrect login or password"
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
            login: document.getElementById("inpLogin").value.trim(),
            password: document.getElementById("inpPassword").value.trim()
          }
          if (!user.login || !user.password) {
            setError(errorMessages.emptyFields)
            return
          }
          userApi.authorizeUser(user).then(response => {
            if (response.error)
              setError(errorMessages[response.error])
            else {
              sessionStorage.setItem("asdf", response.id)
              setUser(response)
              navigate("/main")
            }
          })
        }} className={styles.submit}>submit</button>
      </form>
    </div>
  )
}