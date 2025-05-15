import styles from "./MainPage.module.css"
import MiniUserMenu from "../MiniUserMenu/MiniUserMenu"

export default function MainPage() {
  return (
    <div className={styles.container}>
      <MiniUserMenu />
      <main className={styles.main}>
        <button className={styles.btnPlay}>play</button>
      </main>
    </div>
  )
}