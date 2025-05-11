import { Axios } from "axios";
import { serverUrl } from "./serverUrl";

export const userApi = {
  userAxios: new Axios({
    baseURL: `${serverUrl}/users`,
    headers: { "Content-Type": "application/json" }
  }),
  registerUser(user) {
    return this.userAxios.post("/registration", JSON.stringify(user))
      .then(res => JSON.parse(res.data))
  },
  authorizeUser(user) {
    return this.userAxios.post("/authorization", JSON.stringify(user))
      .then(res => JSON.parse(res.data))
  }
}
