import { Socket } from "socket.io-client";
import type { User } from "./User";
import type { GameStage, Status } from "./enums";

export type gamingSocket = Socket<
  {
    requestToJoin: (partnerLogin: string) => void
    rejectToJoin: () => void

    notFound: () => void

    setPartner: (partner: User) => void
    deletePartner: () => void

    setGameStage: (gameStage: GameStage) => void
    setPartnerStatus: (status: Status) => void
  },
  {
    authorization: (userId: string) => void

    requestToJoin: (partnerLogin: string) => void
    acceptToJoin: () => void
    rejectToJoin: () => void
  }
>