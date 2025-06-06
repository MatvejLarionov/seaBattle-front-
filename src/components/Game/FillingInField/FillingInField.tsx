import styles from "./FillingInField.module.css";
import { useContext, useEffect, type JSX } from "react";
import { GameDataContext } from "../../../context/GameDataContext";
import FieldComponent from "../FieldComponent/FieldComponent";
import MiniGamerMenu from "../MiniGamerMenu/MiniGamerMenu";
import { Status } from "../../../types/enums";
let isMoving: boolean = false
let oldIndex: number = -1
let newIndex: number = -1
export default function FillingInField(): JSX.Element {
  const { gamer, partner, field, socket } = useContext(GameDataContext)

  const redefineIndex = () => {
    oldIndex = newIndex
  }
  const eventListeners = {
    mouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent) {
      event.preventDefault()
      const element = event.target as HTMLElement
      if (element.dataset.index === undefined) {
        oldIndex = -1
        return
      }
      oldIndex = Number(element.dataset.index)
      isMoving = true
    },
    mouseUp() {
      oldIndex = -1
      isMoving = false
    },
    mouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) {
      if (!isMoving)
        return
      let element: HTMLElement
      if ("touches" in event)
        element = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY) as HTMLElement
      else
        element = event.target as HTMLElement
      if (element.dataset.index === undefined) {
        return
      }
      newIndex = Number(element.dataset.index)
      if (newIndex !== oldIndex) {
        socket.emit("movShip", oldIndex, newIndex)
        isMoving = false
      }
    },
    contextMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) {
      event.preventDefault()
      const element = event.target as HTMLElement
      if (element.dataset.index === undefined)
        return
      const index = Number(element.dataset.index)
      socket.emit("turnClockwiseShip", index)
    }
  }

  const isGameReady = gamer.status === Status.readyToPlay
  const btnListeners = {
    setGameReady() {
      socket.emit("setGameReady", !isGameReady)
    },
    disconnect() {
      socket.emit("deletePartner")
    }
  }

  useEffect(() => {
    socket.on("setOnField", redefineIndex)
    socket.on("fieldChangeIsCompleted", () => {
      isMoving = true
    })
    document.getElementById("fieldContainer")?.addEventListener("touchstart",
      eventListeners.mouseDown, { passive: false })
    return () => {
      socket.off("setOnField", redefineIndex)
      socket.off("fieldChangeIsCompleted")
      document.getElementById("fieldContainer")?.removeEventListener("touchstart",
        eventListeners.mouseDown)
    }
  })
  return (
    <div className={styles.container}>
      <div className={styles.gamerContainer}>
        <MiniGamerMenu className={styles.miniGamerMenu} gamer={gamer} />
        <MiniGamerMenu className={styles.miniGamerMenu} gamer={partner || gamer} />
      </div>
      <div id="fieldContainer" className={styles.fieldContainer}
        onMouseDown={eventListeners.mouseDown}
        onMouseUp={eventListeners.mouseUp}
        onMouseMove={eventListeners.mouseMove}

        onTouchEnd={eventListeners.mouseUp}
        onTouchMove={eventListeners.mouseMove}

        onContextMenu={eventListeners.contextMenu}>
        <FieldComponent field={field} />
      </div>
      <nav className={styles.navContainer}>
        <nav className={styles.navContainer}>
          <button onClick={btnListeners.setGameReady} className={styles.btnReadyToPlay}>{isGameReady && "not"} ready to play</button>
          <button onClick={btnListeners.disconnect} className={styles.btnDisconnect}>leave</button>
        </nav>
      </nav>
    </div>
  )
}