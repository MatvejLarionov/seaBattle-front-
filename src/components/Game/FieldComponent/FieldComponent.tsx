import styles from "./FieldComponent.module.css";
import { Cell, Field } from "../../../types/Field";

const cellToColor = {
  [Cell.empty]: "white",
  [Cell.ship]: "green",
  [Cell.destroyedShip]: "red",
  [Cell.destroyedEmpty]: "grey"
}
export default function FieldComponent({ field }: { field: Field }) {
  return (
    <div style={{
      gridTemplateColumns: `repeat(${field.n},${100 / field.n}%)`,
      gridTemplateRows: `repeat(${field.m},${100 / field.m}%)`
    }} className={styles.container}>
      {field.field.map((item: Cell, index: number) => {
        return <div style={{ backgroundColor: cellToColor[item] }} data-index={index} key={index}></div>
      })}
    </div>
  )
}