import styles from "./PreparingForGame.module.css";
import { useContext, type JSX } from "react";
import MiniGamerMenu from "../MiniGamerMenu/MiniGamerMenu";
import { GameDataContext } from "../../../context/GameDataContext";

export default function PreparingForGame(): JSX.Element {
  const { gamer, partner,socket } = useContext(GameDataContext)
  const btnListeners = {
    disconnect(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      socket.emit("deletePartner")
    }
  }
  return (
    <div>
      <div className={styles.gamersContainer}>
        <MiniGamerMenu gamer={gamer} />
        <p className={styles.vs}>VS</p>
        <MiniGamerMenu gamer={partner || gamer} />
      </div>
      <nav className={styles.navContainer}>
        <button className={styles.btnReadyToPlay}>ready to play</button>
        <button onClick={btnListeners.disconnect} className={styles.btnDisconnect}>disconnect</button>
      </nav>
    </div>
  )
}