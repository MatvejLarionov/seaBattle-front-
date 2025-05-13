import styles from "./MainPage.module.css"
import { useContext } from "react"
import { UserDataContext } from "../../context/UserDataContext"

export default function MainPage() {
  const { user, setUser } = useContext(UserDataContext)
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.avatar} src={"http://localhost:3000/img/ava.jpg"} alt="" />
        <p>{user.login}</p>
      </header>
      <main className={styles.main}>
        <button className={styles.btnPlay}>play</button>
      </main>
    </div>
  )
}