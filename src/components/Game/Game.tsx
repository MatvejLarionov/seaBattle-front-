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

    socket.on("setPartner", (partnerUser) => {
      setPartner(new Gamer(partnerUser.login, partnerUser.avatar, Status.connected, gamer.gameStage))
    })
    socket.on("deletePartner", () => {
      setPartner(null)
    })
    socket.on("setGameStage", (gameStage: GameStage) => {
      setGamer(gamer => new Gamer(gamer.login, gamer.avatar, gamer.status, gameStage))
    })
    socket.on("setPartnerStatus", (status) => {
      setPartner(partner => partner &&
        new Gamer(partner.login, partner.avatar, status, partner.gameStage))
    })
    return () => {
      socket.off("setPartner")
      socket.off("deletePartner")
      socket.off("setGameStage")
      socket.disconnect()
    }
  }, [])
  return routerByGameStage[gamer.gameStage] as JSX.Element
}