import styles from "./ProfileEditor.module.css"
import { Link, Route, Routes } from "react-router-dom";

export default function ProfileEditor() {
  return (
    <div className={styles.container}>
      <div className={styles.linksList}>
        <Link to={"/profileEditor/login"}>edit login</Link>
        <Link to={"/profileEditor/password"}>edit password</Link>
        <Link to={"/profileEditor/avatar"}>upload avatar</Link>
      </div>
      <Routes>
        <Route path="/login" element={(
          <form className={styles.form}>
            <input className={styles.login} type="text" placeholder="login" id="inpLogin" />
            <input className={styles.password} type="password" placeholder="password" id="inpPassword" />
            <p className={styles.error}></p>
            <button className={styles.submit}>submit</button>
          </form>
        )} />
    </Routes>
    </div >
  )
}