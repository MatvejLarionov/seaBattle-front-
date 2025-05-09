import { Axios } from "axios";
import { serverUrl } from "./serverUrl";

export const userApi = {
  userAxios: new Axios({ baseURL: `${serverUrl}/users`, headers: { "Content-Type": "application/json" } }),
  postUser(user) {
    return this.userAxios.post("/registration", JSON.stringify(user))
  }
}
