import { useContext, useEffect, type JSX } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import { GameStage, Status } from "../../types/enums";
import Connecting from "./Connecting/Connecting";
import { GameDataContext } from "../../context/GameDataContext";
import Gamer from "../../types/gamer";
import PreparingForGame from "./PreparingForGame/PreparingForGame";

export default function Game(): JSX.Element {
  const { user } = useContext(UserDataContext)
  const { gamer, setGamer, setPartner, socket } = useContext(GameDataContext)
  const routerByGameStage: { [key in GameStage]?: JSX.Element } = {
    [GameStage.connecting]: <Connecting />,
    [GameStage.preparingForGame]: <PreparingForGame />
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
          newGamer.gameStage !== undefined ? newGamer.gameStage : gamer.gameStage
        )
      }
      )
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
          newPartner.gameStage !== undefined ? newPartner.gameStage : partner?.gameStage || GameStage.connecting
        )
      }

      )
    })
    return () => {
      socket.off("setGamer")
      socket.off("setPartner")
      socket.disconnect()
    }
  }, [])
  return routerByGameStage[gamer.gameStage] as JSX.Element
}