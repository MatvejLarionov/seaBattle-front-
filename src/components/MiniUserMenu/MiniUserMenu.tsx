import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../api/serverUrl";
import { UserDataContext } from "../../context/UserDataContext";
import styles from "./MiniUserMenu.module.css"
import { useContext, type JSX } from "react";

export default function MiniUserMenu({ scale = 1 }: { scale?: number }): JSX.Element {
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()
  return (
    <div onClick={() => {
      navigate("/profileEditor")
    }} style={{ transform: `scale(${scale})` }} className={styles.container}>
      <img className={styles.avatar} src={user.avatar || `${serverUrl}/usersAvatars/defaultAvatar.jpg`} alt="" />
      <p>{user.login}</p>
    </div>
  )
}