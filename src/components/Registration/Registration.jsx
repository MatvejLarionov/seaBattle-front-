import { useState } from "react"
import { userApi } from "../../api/userApi"
import styles from "./Registration.module.css"
export default function Registration() {
  const [error, setError] = useState(" ")
  const errorMessages = {
    loginRepeat: "such login already exists",
    emptyFields: "fill in the fields",
    passwordIsNotCorrect: "The password must contain a symbol other than numbers and its size must be greater than eight"
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
          userApi.registerUser(user).then(res => {
            if (res.error)
              setError(errorMessages[res.error])
            else {
              console.log(res)
            }
          })
        }} className={styles.submit}>submit</button>
      </form>
    </div>
  )
}