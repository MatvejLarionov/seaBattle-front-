import styles from "./Authorization.module.css"
export default function Authorization() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input className={styles.login} type="text" placeholder="login" />
        <input className={styles.password} type="password" placeholder="password" />
        <button className={styles.submit}>submit</button>
      </form>
    </div>
  )
}