import { Axios } from "axios";
import { serverUrl } from "./serverUrl";
import type { User, UserForServer } from "../types/User";
import type { ServerErrors } from "../types/enums";

type Response = Promise<User> | Promise<{ error: ServerErrors }>
export const userApi = {
  userAxios: new Axios({
    baseURL: `${serverUrl}/users`,
    headers: { "Content-Type": "application/json" }
  }),
  getUser(id: string): Response {
    return this.userAxios.get(`/${id}`)
      .then(res => JSON.parse(res.data))
  },
  registerUser(user: UserForServer): Response {
    return this.userAxios.post("/registration", JSON.stringify(user))
      .then(res => JSON.parse(res.data))
  },
  authorizeUser(user: UserForServer): Response {
    return this.userAxios.post("/authorization", JSON.stringify(user))
      .then(res => JSON.parse(res.data))
  }
}
