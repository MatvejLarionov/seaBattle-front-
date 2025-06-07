import { Socket } from "socket.io-client";
import type GamerForClient from "./gamerForClient";
import type { Cell } from "./Field";

export type gamingSocket = Socket<
  {
    requestToJoin: (partnerLogin: string) => void
    rejectToJoin: () => void
    notFound: () => void

    setGamer: (gamer: GamerForClient) => void
    setPartner: (partner: GamerForClient | null) => void

    initField: (n: number, m: number) => void
    setOnField: (field: { [key: number]: Cell }) => void
    setOnPartnerField: (field: { [key: number]: Cell }) => void
    fieldChangeIsCompleted: () => void
  },
  {
    authorization: (userId: string) => void

    requestToJoin: (partnerLogin: string) => void
    acceptToJoin: () => void
    rejectToJoin: () => void

    setGameReady: (value: boolean) => void
    deletePartner: () => void

    movShip: (oldIndex: number, newIndex: number) => void
    turnClockwiseShip: (index: number) => void
    shoot: (index: number) => void

    finishGame: () => void
  }
>