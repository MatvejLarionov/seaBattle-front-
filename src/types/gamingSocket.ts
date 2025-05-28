import { Socket } from "socket.io-client";
import type { User } from "./User";

export type gamingSocket = Socket<
  {
    requestToJoin: (partnerLogin: string) => void
    acceptToJoin: (partner: User) => void
    rejectToJoin: () => void
  },
  {
    authorization: (userId: string) => void
    
    requestToJoin: (partnerLogin: string) => void
    acceptToJoin: () => void
    rejectToJoin: () => void
  }
>