import styles from "./Connecting.module.css"
import { useContext, useEffect, useState, type JSX } from "react";
import { GameDataContext } from "../../../context/GameDataContext";
// const openDialog = (type: "request" | "reject" | "notFound" | "waiting") => {
//   (document.getElementById(`dialog_${type}`) as HTMLDialogElement | null)?.showModal()
// }
// const closeDialog = (type: "request" | "reject" | "notFound" | "waiting") => {
//   (document.getElementById(`dialog_${type}`) as HTMLDialogElement | null)?.close()
// }
export default function Connecting(): JSX.Element {
  const createDialogManager = () => {
    let temp = useState<boolean>()
    return {
      isOpen: temp[0],
      _setIsOpen: temp[1],
      open() {
        Object.values(dialogs).forEach(item => {
          item.close()
        })
        this._setIsOpen(true)
      },
      close() {
        this._setIsOpen(false)
      }
    }
  }
  const { socket } = useContext(GameDataContext)
  const [partnerLogin, setPartnerLogin] = useState<string>("")
  const dialogs = {
    request: createDialogManager(),
    reject: createDialogManager(),
    notFound: createDialogManager(),
    waiting: createDialogManager()
  }

  useEffect(() => {
    socket.on("requestToJoin", (partnerLoginArg: string) => {
      setPartnerLogin(partnerLoginArg)
      dialogs.request.open()
    })
    socket.on("rejectToJoin", () => {
      dialogs.reject.open()
    })
    socket.on("notFound", () => {
      dialogs.notFound.open()
    })
    return () => {
      socket.off("requestToJoin")
      socket.off("rejectToJoin")
      socket.off("notFound")
    }
  }, [])

  const btnListeners = {
    emitRequestToJoin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      event.preventDefault()
      const inpValue = (document.getElementById("inpPartnerLogin") as HTMLInputElement).value
      if (!inpValue)
        return
      setPartnerLogin(inpValue)
      socket.emit("requestToJoin", inpValue)
      dialogs.waiting.open()
    },
    acceptToJoin() {
      socket.emit("acceptToJoin")
      dialogs.request.close()
    },
    rejectToJoin() {
      socket.emit("rejectToJoin")
      dialogs.request.close()
    },
  }
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input className={styles.inpPartnerLogin} type="text" placeholder="partner login" id="inpPartnerLogin" />
        <button className={styles.btnEmitRequestToJoin} onClick={btnListeners.emitRequestToJoin}>request to join</button>
      </form>

      <dialog open={dialogs.request.isOpen} id="dialog_request">
        <p>player <span className={styles.partnerLogin}>{partnerLogin}</span> wants to join</p>
        <nav className={styles.nav}>
          <button className={styles.btnAccept} onClick={btnListeners.acceptToJoin}>accept</button>
          <button className={styles.btnReject} onClick={btnListeners.rejectToJoin}>reject</button>
        </nav>
      </dialog>

      <dialog open={dialogs.reject.isOpen} id="dialog_reject">
        <p>player <span className={styles.partnerLogin}>{partnerLogin}</span>  declined the request</p>
        <button className={styles.btnDialogClose} onClick={() => { dialogs.reject.close() }}>close</button>
      </dialog>

      <dialog open={dialogs.notFound.isOpen} id="dialog_notFound">
        <p>player <span className={styles.partnerLogin}>{partnerLogin}</span> not found</p>
        <button className={styles.btnDialogClose} onClick={() => { dialogs.notFound.close() }}>close</button>
      </dialog>

      <dialog open={dialogs.waiting.isOpen} id="dialog_waiting">
        <div className={styles.dialogWaitingContainer}>
          <p>please wait</p>
          <div className={styles.pointContainer}></div>
        </div>
      </dialog>
    </div>
  )
}