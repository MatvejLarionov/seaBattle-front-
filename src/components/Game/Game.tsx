import { useContext, useEffect, type JSX } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import { GameStage, Status } from "../../types/enums";
import Connecting from "./Connecting/Connecting";
import { GameDataContext } from "../../context/GameDataContext";
import Gamer from "../../types/gamer";
import PreparingForGame from "./PreparingForGame/PreparingForGame";
import FillingInField from "./FillingInField/FillingInField";
import { Field } from "../../types/Field";
import Battle from "./Battle/Battle";

export default function Game(): JSX.Element {
  const { user } = useContext(UserDataContext)
  const { gamer, setGamer, setPartner, setField, setPartnerField, socket } = useContext(GameDataContext)
  const routerByGameStage: { [key in GameStage]: JSX.Element } = {
    [GameStage.connecting]: <Connecting />,
    [GameStage.preparingForGame]: <PreparingForGame />,
    [GameStage.fillingInField]: <FillingInField />,
    [GameStage.battle]: <Battle />
  }
  useEffect(() => {
    socket.connect()
    socket.emit("authorization", user.id)
    socket.on("setGamer", (newGamer) => {
      // console.log("gamer:")
      // console.log(newGamer)
      setGamer(gamer => {
        return new Gamer(
          newGamer.login !== undefined ? newGamer.login : gamer.login,
          newGamer.avatar !== undefined ? newGamer.avatar : gamer.avatar,
          newGamer.status !== undefined ? newGamer.status : gamer.status,
          newGamer.gameStage !== undefined ? newGamer.gameStage : gamer.gameStage,
          newGamer.isStep !== undefined ? newGamer.isStep : gamer.isStep
        )
      })
    })
    socket.on("setPartner", (newPartner) => {
      // console.log("partner:")
      // console.log(newPartner)
      if (!newPartner) {
        setPartner(null)
        return
      }
      setPartner(partner => {
        return new Gamer(
          newPartner.login !== undefined ? newPartner.login : partner?.login || "",
          newPartner.avatar !== undefined ? newPartner.avatar : partner?.avatar || "",
          newPartner.status !== undefined ? newPartner.status : partner?.status || Status.connected,
          newPartner.gameStage !== undefined ? newPartner.gameStage : partner?.gameStage || GameStage.connecting,
          newPartner.isStep !== undefined ? newPartner.isStep : partner?.isStep || false,
        )
      })
    })
    socket.on("initField", (n: number, m: number) => {
      setField(new Field(n, m))
      setPartnerField(new Field(n, m))
    })
    socket.on("setOnField", (newField) => {
      setField(field => field.getNewField(newField))
    })
    socket.on("setOnPartnerField", (newField) => {
      setPartnerField(partnerField => partnerField.getNewField(newField))
    })
    return () => {
      socket.off("setGamer")
      socket.off("setPartner")
      socket.off("initField")
      socket.off("setOnField")
      socket.off("setOnPartnerField")
      socket.disconnect()
    }
  }, [])
  return routerByGameStage[gamer.gameStage] as JSX.Element
}