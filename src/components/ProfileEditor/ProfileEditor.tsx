import type { JSX } from "react";
import styles from "./ProfileEditor.module.css"
import { Link, Route, Routes } from "react-router-dom";
import LoginEditorForm from "./LoginEditorForm";
import PasswordEditorForm from "./PasswordEditorForm";

export default function ProfileEditor(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.linksList}>
        <Link to={"/profileEditor/login"}>edit login</Link>
        <Link to={"/profileEditor/password"}>edit password</Link>
        <Link to={"/main"}>to the main page</Link>
        {/* <Link to={"/profileEditor/avatar"}>upload avatar</Link> */}
      </div>
      <Routes>
        <Route path="/login" element={<LoginEditorForm />} />
        <Route path="/password" element={<PasswordEditorForm />} />
      </Routes>
    </div >
  )
}