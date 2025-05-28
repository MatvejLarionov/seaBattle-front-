import styles from "./MainPage.module.css"
import MiniUserMenu from "../MiniUserMenu/MiniUserMenu"
import { useContext } from "react"
import { UserDataContext } from "../../context/UserDataContext"
import { useNavigate } from "react-router-dom"

export default function MainPage() {
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <MiniUserMenu user={user} isNavigateToProfileEditor={true} />
      <main className={styles.main}>
        <button onClick={() => { navigate("/game") }} className={styles.btnPlay}>play</button>
      </main>
    </div>
  )
}