import styles from "./Battle.module.css";
import { useContext } from "react";
import { GameDataContext } from "../../../context/GameDataContext";
import FieldComponent from "../FieldComponent/FieldComponent";
import MiniGamerMenu from "../MiniGamerMenu/MiniGamerMenu";

export default function Battle() {
  const { gamer, partner, field, partnerField, socket } = useContext(GameDataContext)
  const eventListeners = {
    click(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      const element = event.target as HTMLElement
      if (element.dataset.index === undefined)
        return
      const index: number = Number(element.dataset.index)
      socket.emit("shoot", index)
    }
  }
  return (
    <div className={styles.container}>

      <div className={styles.gamerContainer}>
        <MiniGamerMenu style={{ animationName: gamer.isStep ? styles.Backlight : "none" }}
          className={styles.miniGamerMenu} gamer={gamer} />
        <div className={styles.fieldContainer}>
          <FieldComponent field={field} />
        </div>
      </div>

      <div className={styles.partnerContainer}>
        <MiniGamerMenu style={{ animationName: !gamer.isStep ? styles.Backlight : "none" }}
          className={styles.miniGamerMenu} gamer={partner || gamer} />
        <div className={styles.fieldContainer} onClick={eventListeners.click} >
          <FieldComponent field={partnerField} />
        </div>
      </div>

    </div>
  )
}