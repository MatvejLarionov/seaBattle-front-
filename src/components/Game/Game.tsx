import { useContext, useEffect, type JSX } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import { GameStage } from "../../types/enums";
import Connecting from "./Connecting/Connecting";
import { GameDataContext } from "../../context/GameDataContext";

export default function Game(): JSX.Element {
  const { user } = useContext(UserDataContext)
  const { gamer, socket } = useContext(GameDataContext)
  const routerByGameStage: { [key in GameStage]?: JSX.Element } = {
    [GameStage.connecting]: <Connecting />
  }
  useEffect(() => {
    socket.connect()
    socket.emit("authorization", user.id)
    return () => {
      socket.disconnect()
    }
  }, [user])
  return routerByGameStage[gamer.gameStage] as JSX.Element
}