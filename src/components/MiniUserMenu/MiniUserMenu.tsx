import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../api/serverUrl";
import type { User } from "../../types/User";
import styles from "./MiniUserMenu.module.css"
import { type JSX } from "react";

export default function MiniUserMenu(
  { user, isNavigateToProfileEditor, scale = 1, }:
    { user: User, isNavigateToProfileEditor: boolean, scale?: number }): JSX.Element {
  const navigate = useNavigate()

  return (
    <div onClick={() => {
      if (isNavigateToProfileEditor)
        navigate("/profileEditor")
    }} style={{ transform: `scale(${scale})`, cursor: isNavigateToProfileEditor ? "pointer" : "auto" }} className={styles.container}>
      <img className={styles.avatar} src={user.avatar || `${serverUrl}/usersAvatars/defaultAvatar.jpg`} alt="" />
      <p>{user.login}</p>
    </div>
  )
}