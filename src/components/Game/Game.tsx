import { io } from "socket.io-client";
import { serverUrl } from "../../api/serverUrl";
import { useContext, useEffect, useState, type JSX } from "react";
import type { gamingSocket } from "../../types/gamingSocket";
import { UserDataContext } from "../../context/UserDataContext";
import Gamer from "../../types/gamer";

const socket: gamingSocket = io(serverUrl, { autoConnect: false })
export default function Game(): JSX.Element {
  const { user } = useContext(UserDataContext)
  const [gamer, setGamer] = useState<Gamer>()
  const [partner, setPartner] = useState<Gamer>()
  useEffect(() => {
    socket.connect()
    socket.emit("authorization", user.id)
    return () => {
      socket.disconnect()
    }
  })
  return (
    <div>game</div>
  )
}