import { Axios } from "axios";
import { serverUrl } from "./serverUrl";
import type { User, UserDataForAuthorization, UserDataForRegistration, UserDataForUpdate } from "../types/User";
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
  registerUser(user: UserDataForRegistration): Response {
    return this.userAxios.post("/registration", JSON.stringify(user))
      .then(res => JSON.parse(res.data))
  },
  authorizeUser(user: UserDataForAuthorization): Response {
    return this.userAxios.post("/authorization", JSON.stringify(user))
      .then(res => JSON.parse(res.data))
  },
  updateUser(id: string, newData: UserDataForUpdate): Response {
    return this.userAxios.patch(`/${id}`, JSON.stringify(newData))
      .then(res => JSON.parse(res.data))
  }
}
