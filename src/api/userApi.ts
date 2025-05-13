import { Axios } from "axios";
import { serverUrl } from "./serverUrl";
import type { UserToServer } from "../types/User";
import type { ServerErrors } from "../types/enums";

type Response = Promise<{ login?: string, id?: string, error?: ServerErrors }>
export const userApi = {
  userAxios: new Axios({
    baseURL: `${serverUrl}/users`,
    headers: { "Content-Type": "application/json" }
  }),
  getUser(id: string): Response {
    return this.userAxios.get(`/${id}`)
      .then(res => JSON.parse(res.data))
  },
  registerUser(user: UserToServer): Response {
    return this.userAxios.post("/registration", JSON.stringify(user))
      .then(res => JSON.parse(res.data))
  },
  authorizeUser(user: UserToServer): Response {
    return this.userAxios.post("/authorization", JSON.stringify(user))
      .then(res => JSON.parse(res.data))
  }
}
