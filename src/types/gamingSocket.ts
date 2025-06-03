import { Socket } from "socket.io-client";
import type GamerForClient from "./gamerForClient";

export type gamingSocket = Socket<
  {
    requestToJoin: (partnerLogin: string) => void
    rejectToJoin: () => void
    notFound: () => void

    setGamer: (gamer: GamerForClient) => void
    setPartner: (partner: GamerForClient | null) => void
  },
  {
    authorization: (userId: string) => void

    requestToJoin: (partnerLogin: string) => void
    acceptToJoin: () => void
    rejectToJoin: () => void
    deletePartner: () => void
  }
>