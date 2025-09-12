import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../api/serverUrl";
import type { User } from "../../types/User";
import styles from "./MiniUserMenu.module.css"
import { type JSX } from "react";

export default function MiniUserMenu(
  { user, isNavigateToProfileEditor, style, }:
    { user: User, isNavigateToProfileEditor: boolean, style?: React.CSSProperties }): JSX.Element {
  const navigate = useNavigate()

  return (
    <div onClick={() => {
      if (isNavigateToProfileEditor)
        navigate("/profileEditor")
    }} style={{ ...style, cursor: isNavigateToProfileEditor ? "pointer" : "auto" }} className={styles.container}>
      <img className={styles.avatar} src={user.avatar || `${serverUrl}/usersAvatars/defaultAvatar.jpg`} alt="" />
      <p className={styles.login}>{user.login}</p>
    </div>
  )
}