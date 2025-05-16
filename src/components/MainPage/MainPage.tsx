import styles from "./MainPage.module.css"
import MiniUserMenu from "../MiniUserMenu/MiniUserMenu"
import { useContext } from "react"
import { UserDataContext } from "../../context/UserDataContext"

export default function MainPage() {
  const { user } = useContext(UserDataContext)
  return (
    <div className={styles.container}>
      <MiniUserMenu user={user} isNavigateToProfileEditor={true} />
      <main className={styles.main}>
        <button className={styles.btnPlay}>play</button>
      </main>
    </div>
  )
}