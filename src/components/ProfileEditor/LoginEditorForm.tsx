import { userApi } from "../../api/userApi";
import { errorMessages } from "../../constants/errorMessagesForForm";
import { ServerErrors } from "../../types/enums";
import type { UserDataForUpdate } from "../../types/User";
import styles from "./ProfileEditor.module.css"
import { useContext, useState, type JSX } from "react";
import { UserDataContext } from "../../context/UserDataContext";

export default function LoginEditorForm(): JSX.Element {
  const [error, setError] = useState<string>(" ")
  const { user: oldUser, setUser } = useContext(UserDataContext)
  return (
    <form className={styles.form}>
      <input className={styles.password} type="password" placeholder="password" id="inpPassword" />
      <input className={styles.login} type="text" placeholder="new login" id="inpLogin" />
      <p style={{ color: error === "success" ? "green" : "red" }} className={styles.error}>{error}</p>
      <button onClick={event => {
        event.preventDefault()
        const user: UserDataForUpdate = {
          login: (document.getElementById("inpLogin") as HTMLInputElement).value.trim(),
          oldPassword: (document.getElementById("inpPassword") as HTMLInputElement).value.trim()
        }
        if (!user.login || !user.oldPassword) {
          setError(errorMessages[ServerErrors.emptyFields] as string)
          return
        }
        userApi.updateUser(oldUser.id, user).then(response => {
          if ("error" in response)
            setError(errorMessages[response.error] as string)
          else {
            setError("success")
            setUser(response)
            sessionStorage.setItem("asdf", response.id)
          }
        })
      }} className={styles.submit}>submit</button>
    </form>
  )
}