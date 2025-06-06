import styles from "./PreparingForGame.module.css";
import { useContext, type JSX } from "react";
import MiniGamerMenu from "../MiniGamerMenu/MiniGamerMenu";
import { GameDataContext } from "../../../context/GameDataContext";
import { Status } from "../../../types/enums";

export default function PreparingForGame(): JSX.Element {
  const { gamer, partner, socket } = useContext(GameDataContext)
  const isGameReady = gamer.status === Status.readyToPlay ? true : false
  const btnListeners = {
    setGameReady() {
      socket.emit("setGameReady", !isGameReady)
    },
    disconnect() {
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
        <button onClick={btnListeners.setGameReady} className={styles.btnReadyToPlay}>{isGameReady && "not"} ready to play</button>
        <button onClick={btnListeners.disconnect} className={styles.btnDisconnect}>leave</button>
      </nav>
    </div>
  )
}