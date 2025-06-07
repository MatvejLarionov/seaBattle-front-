import styles from "./EndGame.module.css";
import { useContext, type JSX } from "react";
import { GameDataContext } from "../../../context/GameDataContext";

export default function EndGame(): JSX.Element {
  const { gamer, socket } = useContext(GameDataContext)
  const eventListeners = {
    finishGame() {
      socket.emit("finishGame")
    }
  }
  return (
    <div className={styles.container}>
      <header style={{ animationName: gamer.isWinner ? styles.BacklightVictory : styles.BacklightLoss }} className={styles.header}>
        {gamer.isWinner ? "victory" : "loss"}
      </header>
      <div>
        <p>number of hits: <span className={styles.numberOfHits}>{gamer.numberOfHits}</span></p>
        <p>number of misses: <span className={styles.numberOfMisses}>{gamer.numberOfMisses}</span></p>
      </div>
      <nav>
        <button onClick={eventListeners.finishGame} className={styles.btnFinish}>finish</button>
      </nav>
    </div>
  )
}