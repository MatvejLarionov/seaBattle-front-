import styles from "./Registration.module.css"
export default function Registration() {

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input className={styles.login} type="text" placeholder="login" id="inpLogin" />
        <input className={styles.password} type="password" placeholder="password" id="inpPassword" />
        <button onClick={event => {
          event.preventDefault()
          const user = {
            login: document.getElementById("inpLogin").value.trim(),
            password: document.getElementById("inpPassword").value.trim()
          }
        }} className={styles.submit}>submit</button>
      </form>
    </div>
  )
}