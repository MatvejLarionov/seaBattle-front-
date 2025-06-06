import styles from "./MiniGamerMenu.module.css"
import type { JSX } from "react";
import type Gamer from "../../../types/gamer";
import MiniUserMenu from "../../MiniUserMenu/MiniUserMenu";
import { Status } from "../../../types/enums";

export default function MiniGamerMenu({ gamer, style, className }: { gamer: Gamer, style?: React.CSSProperties, className?: string }): JSX.Element {
  const statusText: { [key in Status]: string } = {
    [Status.connected]: "connected",
    [Status.disconnected]: "disconnected",
    [Status.readyToPlay]: "ready to play"
  }
  const statusColor: { [key in Status]: string } = {
    [Status.connected]: "green",
    [Status.disconnected]: "red",
    [Status.readyToPlay]: "orange"
  }
  return (
    <div style={style} className={`${styles.container} ${className}`}>
      <MiniUserMenu user={gamer.toUser()} isNavigateToProfileEditor={false} style={{ width: "100%" }} />
      <p className={styles.status} style={{ color: statusColor[gamer.status] }}>
        {statusText[gamer.status]}
      </p>
    </div>
  )
}