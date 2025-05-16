import { ServerErrors } from "../types/enums";

export const errorMessages: { [key in ServerErrors]?: string } = {
  [ServerErrors.notFound]: "incorrect login or password",
  [ServerErrors.emptyFields]: "fill in the fields",
  [ServerErrors.loginRepeat]: "such login already exists",
  [ServerErrors.passwordIsNotCorrect]: "The password must contain a symbol other than numbers and its size must be greater than eight"
}