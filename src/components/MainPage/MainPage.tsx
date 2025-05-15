import styles from "./MainPage.module.css"
import { useContext } from "react"
import { UserDataContext } from "../../context/UserDataContext"
import { serverUrl } from "../../api/serverUrl"

export default function MainPage() {
  const { user } = useContext(UserDataContext)
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.avatar} src={user.avatar || `${serverUrl}/usersAvatars/defaultAvatar.jpg`} alt="" />
        <p>{user.login}</p>
      </header>
      <main className={styles.main}>
        <button className={styles.btnPlay}>play</button>
      </main>
    </div>
  )
}