import { useNavigate } from "react-router-dom"
import styles from "./Title.module.css"
export default function Title() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} src="/imgs/logo.png" alt="logo" />
        <p className={styles.headerText}>Welcome to the game Sea Battle!!!</p>
      </header>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <button className={styles.registration} onClick={() => {
            navigate("/registration")
          }}>registration</button>
          <button className={styles.authorization}
            onClick={() => {
              navigate("/authorization")
            }}>authorization</button>
        </nav>
      </main>
    </div>
  )
}