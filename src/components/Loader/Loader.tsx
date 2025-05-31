import styles from "./Loader.module.css";
import type { JSX } from "react";

export default function Loader({ numberOfPoints = 10, style }:
  { numberOfPoints?: number, style?: React.CSSProperties }): JSX.Element {
  const degree = 360 / numberOfPoints
  const arr: JSX.Element[] = Array.from({ length: numberOfPoints }, (item, index) =>
    <div style={{ transform: `rotate(${degree * index}deg)` }} key={index}>.</div>)
  return (
    <div style={style} className={styles.loader}>
      {arr}
    </div>
  )
}