import { createContext, useContext, useState, type JSX } from "react"
import Gamer from "../types/gamer"
import { UserDataContext } from "./UserDataContext"
import { GameStage, Status } from "../types/enums"
import type { gamingSocket } from "../types/gamingSocket"
import { io } from "socket.io-client"
import { serverUrl } from "../api/serverUrl"
import { Field } from "../types/Field"

const socket: gamingSocket = io(serverUrl, { autoConnect: false })
export const GameDataContext = createContext<{
  socket: gamingSocket

  gamer: Gamer
  setGamer: React.Dispatch<React.SetStateAction<Gamer>>

  partner: Gamer | null
  setPartner: React.Dispatch<React.SetStateAction<Gamer | null>>

  field: Field
  setField: React.Dispatch<React.SetStateAction<Field>>

  partnerField: Field
  setPartnerField: React.Dispatch<React.SetStateAction<Field>>
} | null>(null) as
  React.Context<{
    socket: gamingSocket

    gamer: Gamer
    setGamer: React.Dispatch<React.SetStateAction<Gamer>>

    partner: Gamer | null
    setPartner: React.Dispatch<React.SetStateAction<Gamer | null>>

    field: Field
    setField: React.Dispatch<React.SetStateAction<Field>>

    partnerField: Field
    setPartnerField: React.Dispatch<React.SetStateAction<Field>>
  }>

export default function GameDataContextProvider({ children }: { children?: JSX.Element | string }) {
  const { user } = useContext(UserDataContext)
  const [gamer, setGamer] = useState<Gamer>(new Gamer(user.login, user.avatar,
    Status.connected, GameStage.connecting))
  const [partner, setPartner] = useState<Gamer | null>(null)
  const [field, setField] = useState<Field>(new Field())
  const [partnerField, setPartnerField] = useState<Field>(new Field())
  return (
    <GameDataContext.Provider
      value={{
        socket, gamer, setGamer, partner, setPartner,
        field, setField, partnerField, setPartnerField
      }}>
      {children}
    </GameDataContext.Provider>
  )
}